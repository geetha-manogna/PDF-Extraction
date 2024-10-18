import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';

const UploadForm = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        // Send the file to the backend
        const response = await axios.post('http://localhost:5003/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        // Pass the extracted events back to the parent component
        onFileSelect(response.data.events);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Upload Syllabus
      </Typography>
      <TextField
        type="file"
        onChange={handleFileChange}
        fullWidth
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Upload
      </Button>
    </Box>
  );
};

export default UploadForm;
