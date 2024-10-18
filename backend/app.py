from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import PyPDF2

app = Flask(__name__)
CORS(app)

# Sample event extraction logic
def extract_events(text):
    events = []
    pattern = re.compile(r'(Exam|Assignment|Midterm|Final).*\b(\d{1,2}/\d{1,2}/\d{4})')
    matches = pattern.findall(text)
    for match in matches:
        event_name, date = match
        events.append({"event_name": event_name, "date": date})
    return events

# API to handle syllabus upload
@app.route('/upload_syllabus', methods=['POST'])
def upload_syllabus():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"})
    file = request.files['file']
    
    # Read and parse the file (PDF or text)
    text = ""
    if file.filename.endswith(".pdf"):
        pdf_reader = PyPDF2.PdfReader(file)
        for page in pdf_reader.pages:
            text += page.extract_text()
    else:
        text = file.read().decode('utf-8')

    # Extract events from the syllabus text
    events = extract_events(text)

    return jsonify({"events": events})

if __name__ == "__main__":
    app.run(debug=True)
