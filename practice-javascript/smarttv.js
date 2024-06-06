document.addEventListener('DOMContentLoaded', function () {
    // Get the 'app' element
    const app = document.getElementById('app');

    // Display a welcome message
    const messageElement = document.getElementById('message');
    messageElement.textContent = 'SMART TV';

    // Example Tizen Web API is supported
    try {
        // Check if the Tizen API is supported
        if (window.tizen) {
            // Access Tizen system info
            const systemInfo = tizen.systeminfo;
            const buildInfo = systemInfo.getCapabilities();

            // Display Tizen build information
            const buildInfoStr = JSON.stringify(buildInfo, null, 2);
            messageElement.textContent = `Tizen Build Information:\n${buildInfoStr}`;
        } else {
            messageElement.textContent = 'Tizen API not supported.';
        }
    } catch (error) {
        console.error('Error accessing Tizen API:', error);
        messageElement.textContent = 'Error accessing Tizen API.';
    }
});