// Server-Side (Node.js and Express)
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let eventSchedule = { 
    date: 'Monday, March 11, 2024',
    time: '9:34 AM',
};

// Route to handle the event schedule update
app.patch('/api/event/schedule', (req, res) => {
    const { date, time } = req.body;

    if (date && time) {
        eventSchedule = { date, time };
        res.json({ message: 'Event schedule updated successfully' });
    } else {
        res.status(400).json({ error: 'Invalid data provided for schedule update' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});