import cv2
import numpy as np
from ultralytics import YOLO

# Load the trained YOLO model
model_path = r"C:\Users\ABC\Downloads\best_accident_detection_model.pt"  # Path to your best model weights
model = YOLO(model_path)

# Open the video stream (use 0 for webcam or path to video file)
video_path = "C:\\Users\\ABC\\Desktop\\projects\\ACCIDENT-DETECTION\\Accident-1.mp4"  # Path to your video file
cap = cv2.VideoCapture(video_path)

# Class names based on your dataset
class_names = ['Accident', 'Motorcycle', 'Truck', 'cars', 'severe-accident']

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Perform detection on the current frame
    results = model(frame)

    # Get the detected boxes, class IDs, and confidences
    detections = results[0].boxes  # Access the first element in the list (which contains the detections)

    detected_severe_accident = False  # Flag to indicate if a severe accident is detected

    for det in detections:
        # Extract class ID, confidence, and other details from the detection
        class_id = int(det.cls)  # Class ID
        confidence = det.conf.item()  # Confidence score (converted to float)
        xyxy = det.xyxy.numpy()  # Convert the tensor to a numpy array

        # Make sure the array has 4 values (x1, y1, x2, y2)
        if xyxy.shape[0] == 4:
            x1, y1, x2, y2 = xyxy  # Bounding box coordinates (x1, y1, x2, y2)

            # Check if the detection is for 'severe-accident' and confidence is above threshold
            if class_names[class_id] == 'severe-accident' and confidence > 0.5:  # You can adjust the threshold
                detected_severe_accident = True
                # Optionally, display a message or mark the frame
                cv2.putText(frame, "Severe Accident Detected!", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2, cv2.LINE_AA)

                # Optionally, draw the bounding box for the severe accident
                cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 0, 255), 2)

    # Render the results (bounding boxes, labels, etc.)
    # We can use the built-in plot method, which renders the detections on the frame
    annotated_frame = results[0].plot()  # This renders the annotations on the frame

    # Display the frame with detections
    cv2.imshow('Accident Detection', annotated_frame)

    if detected_severe_accident:
        print("Severe accident detected in the video!")

    # Press 'q' to exit the video stream
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the video capture and close the window
cap.release()
cv2.destroyAllWindows()
