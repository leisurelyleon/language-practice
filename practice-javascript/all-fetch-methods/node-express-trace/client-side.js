// Define a function to perform trace request
async function performTraceRequest() {
    try {
        const response = await fetch('/api/troubleshoot', {
            method: 'TRACE',
        });

        if (response.ok) {
            const diagnosticInfo = await response.json();
            console.log('Diagnostic Information:', diagnosticInfo);
        } else {
            throw new Error('Failed to perform TRACE request');
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

// Example of utilization
(async () => {
    try {
        await performTraceRequest();
    } catch (error) {
        console.error('Failed to perform TRACE request', error.message);
    }
})();