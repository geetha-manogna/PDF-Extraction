import React, { useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import UploadForm from './components/UploadForm';
import EventTable from './components/EventTable';
import EventCalendar from './components/EventCalendar';

function App() {
  const [events, setEvents] = useState([]);

  // Handle events extracted from the uploaded PDF
  const handleFileSelect = (extractedEvents) => {
    setEvents(extractedEvents);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Syllabus Event Manager
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <UploadForm onFileSelect={handleFileSelect} />
        </Grid>
        <Grid item xs={12} md={6}>
          <EventCalendar events={events} />
        </Grid>
        <Grid item xs={12}>
          <EventTable events={events} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
