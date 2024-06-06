const express = require('express');
const app = express();

// Define a route to handle TRACE requests for diagnostic purposes
app.trace('/api/troubleshoot', (req, res) => {
    const diagnosticInfo = {
        requestHeaders: req.headers,
        requestMethod: req.method,
        requestUrl: req.originalUrl,
        serverResponse: 'TRACE request processed successfully',
    };

    res.json(diagnosticInfo);
});

app._listen(3000, () => {
    console.log('Server is running on port 3000');
});