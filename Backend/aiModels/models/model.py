# toxic_detector.py
from transformers import pipeline
import sys
import json

# Load Hugging Face toxic model
classifier = pipeline("text-classification", model="unitary/toxic-bert")

# Get the comment from Node.js
text = sys.argv[1]

# Run classification
result = classifier(text)

# Return result to Node.js
print(json.dumps(result))
