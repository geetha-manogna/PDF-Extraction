const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// Multer setup for handling file uploads
const upload = multer({ dest: 'uploads/' });

// Route to handle PDF upload and extraction
app.post('/upload', upload.single('file'), async (req, res) => {
  const filePath = path.join(__dirname, req.file.path);
  
  try {
    // Read and parse the uploaded PDF file
    const dataBuffer = await pdfParse(filePath);
    const pdfText = dataBuffer.text;

    // Extract events from the PDF text (simplified example)
    const events = extractEventsFromText(pdfText);  // Function to extract events
    res.json({ events });
  } catch (error) {
    console.error('Error parsing PDF:', error);
    res.status(500).json({ error: 'Failed to parse PDF' });
  }
});

// Function to extract events from text (customize this as needed)
function extractEventsFromText(text) {
  const eventPattern = /(Exam|Assignment).*\b(\d{1,2}\/\d{1,2}\/\d{4})/g;
  const events = [];
  let match;

  while ((match = eventPattern.exec(text)) !== null) {
    events.push({
      event_name: match[1],
      date: match[2],
      description: match[0],
    });
  }
  return events;
}

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
