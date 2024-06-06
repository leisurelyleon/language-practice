// Define a function to retrieve metadata from file system
async function retrieveFileMetadata(fileId) {
    try {
        const response = await fetch('/api/files/${fileId}', {
            method: 'HEAD',
        });

        if (response.ok) {
            const contentLength = response.headers.get('Content-Length');
            const lastModified = response.headers.get('Last-Modified');

            console.log(`File Size: ${contentLength} bytes`);
            console.log(`Last Modified: ${lastModified}`);
        } else {
            throw new Error('Failed to retrieve file metadata');
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

// Example of utilization
(async () => {
    const fileId = 'example-file-id'; // Replace with actual file ID
    try {
        await retrieveFileMetadata(fileId);
    } catch (error) {
        console.error('Failed to retrieve file metadata', error.message);
    }
})();