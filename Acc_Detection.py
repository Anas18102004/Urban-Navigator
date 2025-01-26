import cv2
import socket
import json
import threading
from ultralytics import YOLO  # Import the YOLO class directly

# Load YOLOv11 model
def load_model(model_path):
    print("Loading model...")
    model = YOLO(model_path)  # Use the YOLO class from ultralytics
    return model

# Initialize video capture objects for all sources
def initialize_video_sources(video_sources):
    print("Initializing video sources...")
    caps = [cv2.VideoCapture(source) for source in video_sources]
    for i, cap in enumerate(caps):
        if not cap.isOpened():
            print(f"Error opening video source {video_sources[i]}")
    return caps

# Generate unique ID for vehicle tracking
def generate_unique_id(camera_index, vehicle_tracking_ids):
    vehicle_tracking_ids[camera_index] += 1
    return vehicle_tracking_ids[camera_index]

# Check if a vehicle is already being tracked
def is_vehicle_already_tracked(camera_index, new_bbox, tracker_bboxes):
    for bbox in tracker_bboxes[camera_index].values():
        if (bbox[0] < new_bbox[0] + new_bbox[2] and
            bbox[0] + bbox[2] > new_bbox[0] and
            bbox[1] < new_bbox[1] + new_bbox[3] and
            bbox[1] + bbox[3] > new_bbox[1]):
            return True
    return False

# Send vehicle counts to central controller
def send_vehicle_counts(sock, server_address, vehicle_counts):
    print("Sending vehicle counts...")
    for i, count in enumerate(vehicle_counts):
        message = json.dumps({'lane_id': f'signal{i+1}', 'vehicle_count': count}).encode('utf-8')
        sock.sendto(message, server_address)

# Receive traffic signal status from central controller
def receive_traffic_signal(recv_sock, traffic_signal, stop_event):
    while not stop_event.is_set():
        try:
            data, _ = recv_sock.recvfrom(1024)
            message = json.loads(data.decode('utf-8'))
            print(f"Received traffic signal message: {message}")
            if message['lane_id'] in [f'signal{i+1}' for i in range(len(traffic_signal))]:
                traffic_signal[0] = message['traffic_signal']
        except json.JSONDecodeError:
            print("Error decoding JSON message.")
        except socket.error as e:
            if stop_event.is_set():
                break
            print(f"Error receiving traffic signal: {e}")

# Process video frames and track vehicles
# Process frames and track vehicles
def process_frames(caps, model, traffic_signal, total_vehicle_counts, vehicle_tracking_ids, trackers, tracker_dicts, tracker_bboxes, tracker_misses, sock, server_address):
    margin = 15
    tracker_factory = cv2.TrackerCSRT_create

    while all(cap.isOpened() for cap in caps):
        frames = []
        for cap in caps:
            ret, frame = cap.read()
            if ret:
                frames.append(frame)
            else:
                frames.append(None)

        if any(frame is None for frame in frames):
            print("One of the frames is None. Breaking the loop.")
            break

        for i, frame in enumerate(frames):
            height, width, _ = frame.shape
            print(f"Processing frame for camera {i+1}...")

            # Inference with YOLOv11
            results = model(frame)
            boxes = results[0].boxes.xyxy.cpu().numpy()  # Get the bounding box coordinates
            confs = results[0].boxes.conf.cpu().numpy()  # Get the confidence scores
            print(f"Detected {len(boxes)} objects.")

            # Filter detections based on confidence threshold (0.5 for example)
            boxes = boxes[confs > 0.5]
            print(f"After filtering, {len(boxes)} objects remain.")

            # Update trackers
            updated_trackers = []
            updated_tracker_dict = {}
            updated_tracker_bboxes = {}
            for tracker in trackers[i]:
                if tracker in tracker_dicts[i]:
                    success, bbox = tracker.update(frame)
                    if success:
                        x, y, w, h = map(int, bbox)
                        if (margin <= x < width - margin and margin <= y < height - margin and
                            margin <= x + w < width - margin and margin <= y + h < height - margin):
                            updated_trackers.append(tracker)
                            obj_id = tracker_dicts[i][tracker]
                            updated_tracker_dict[tracker] = obj_id
                            updated_tracker_bboxes[obj_id] = (x, y, w, h)
                            tracker_misses[i][tracker] = 0
                        else:
                            tracker_misses[i][tracker] += 1
                            if tracker_misses[i][tracker] > 5:
                                total_vehicle_counts[i] -= 1
                            else:
                                updated_trackers.append(tracker)
                                updated_tracker_dict[tracker] = tracker_dicts[i][tracker]
                                updated_tracker_bboxes[obj_id] = bbox
                    else:
                        tracker_misses[i][tracker] += 1
                        if tracker_misses[i][tracker] > 5:
                            total_vehicle_counts[i] -= 1
                        else:
                            updated_trackers.append(tracker)
                            updated_tracker_dict[tracker] = tracker_dicts[i][tracker]
                            updated_tracker_bboxes[tracker_dicts[i][tracker]] = bbox

            trackers[i] = updated_trackers
            tracker_dicts[i] = updated_tracker_dict
            tracker_bboxes[i] = updated_tracker_bboxes

            # Initialize new trackers for detected objects
            for box in boxes:
                x1, y1, x2, y2 = map(int, box[:4])
                new_bbox = (x1, y1, x2 - x1, y2 - y1)
                
                if not is_vehicle_already_tracked(i, new_bbox, tracker_bboxes):
                    tracker = tracker_factory()
                    tracker.init(frame, new_bbox)
                    obj_id = generate_unique_id(i, vehicle_tracking_ids)
                    trackers[i].append(tracker)
                    tracker_dicts[i][tracker] = obj_id
                    tracker_bboxes[i][obj_id] = new_bbox
                    tracker_misses[i][tracker] = 0
                    total_vehicle_counts[i] += 1

            # Send vehicle count to central controller
            send_vehicle_counts(sock, server_address, total_vehicle_counts)

            # Display vehicle count and traffic signal on frame
            cv2.putText(frame, f'Total Vehicles Counted: {total_vehicle_counts[i]}', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255), 2)
            cv2.putText(frame, f'Traffic Signal: {traffic_signal[0]}', (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255), 2)

            # Draw bounding boxes and IDs
            for obj_id, bbox in tracker_bboxes[i].items():
                x, y, w, h = bbox
                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
                cv2.putText(frame, f'ID {obj_id}', (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)

            # Display the frame
            cv2.imshow(f'Traffic Monitoring - Camera {i+1}', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release video capture objects
    for cap in caps:
        cap.release()
    cv2.destroyAllWindows()

def main():
    # Parameters
    model_path = r"C:\Users\ABC\Downloads\yolo11n.pt"  # Update model path to YOLOv11
    video_sources = [
        "C:\\Users\\ABC\\Downloads\\shani2.mp4"
    ]
    server_address = ('localhost', 12345)
    traffic_signal = ["Red"]  # Use a list to allow modification within threads

    # Load model
    model = load_model(model_path)
    print("Model loaded.")

    # Initialize video sources
    caps = initialize_video_sources(video_sources)
    print("Video sources initialized.")

    # Initialize vehicle counts and trackers
    total_vehicle_counts = [0] * len(video_sources)
    vehicle_tracking_ids = [0] * len(video_sources)
    trackers = [[] for _ in range(len(video_sources))]
    tracker_dicts = [{} for _ in range(len(video_sources))]
    tracker_bboxes = [{} for _ in range(len(video_sources))]
    tracker_misses = [{} for _ in range(len(video_sources))]

    # Initialize sockets for communication
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    recv_sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    recv_sock.bind(('localhost', 12348))

    print("Sockets initialized and bound.")

    # Create a stop event for the thread
    stop_event = threading.Event()

    # Start thread to receive traffic signal status
    thread = threading.Thread(target=receive_traffic_signal, args=(recv_sock, traffic_signal, stop_event))
    thread.daemon = True
    thread.start()
    print("Traffic signal receiving thread started.")

    # Process video frames
    try:
        process_frames(caps, model, traffic_signal, total_vehicle_counts, vehicle_tracking_ids, trackers, tracker_dicts, tracker_bboxes, tracker_misses, sock, server_address)
    finally:
        # Signal the thread to stop and wait for it to finish
        stop_event.set()
        recv_sock.close()
        thread.join()
        sock.close()
        print("Sockets closed and thread joined.")

if __name__ == "__main__":
    main()
