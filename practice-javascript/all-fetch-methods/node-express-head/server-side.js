const express = require('express');
const app = express();

app.get('/api/files/:fileId', (req, res) => {
    // Simulated file metadata for demonstration
    const fileMetadata = {
        fileId: req.params.fileId,
        fileSize: 1024, // Size in bytes
        lastModified: new Date().toUTCString(),
        // Other metadata properties
    };

    res.json(fileMetadata);
});

app.head('/api/files/:fileId', (req, res) => {
    // Simulated HEAD request handler for retrieving file metadata
    // In a real situation metadata from the file system or database may be retrieved
    res.header('Content-Length', '1024'); // Simulated content length
    res.header('Last-Modified', new Date().toUTCString()); // Simulated last modified time
    res.status(200).end(); // End the response without a body
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});