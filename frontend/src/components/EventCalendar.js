import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Paper, Typography, Box } from '@mui/material';
import './EventCalendar.css'; 

const EventCalendar = ({ events }) => {  
  const [date, setDate] = useState(new Date());

  const highlightEventDates = ({ date }) => {
    const eventDates = events.map(event => new Date(event.date).toDateString());

    if (eventDates.includes(date.toDateString())) {
      return 'highlight';  
    }
    return null;
  };

  return (
    <Paper sx={{ mt: 2, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Calendar View
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Calendar
          value={date}
          onChange={setDate}
          tileClassName={highlightEventDates}  // Use tileClassName to highlight event dates
        />
      </Box>
      <Typography variant="body1" align="center" sx={{ mt: 2 }}>
        Selected Date: {date.toDateString()}
      </Typography>
    </Paper>
  );
};

export default EventCalendar;
