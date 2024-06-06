// Define a function to fetch weather API options
async function fetchApiOptions() {
    try {
        const response = await fetch('/api/weather/options', {
            method: 'OPTIONS',
        });

        if (response.ok) {
            const options = await response.json();
            return options;
        } else {
            throw new Error('Failed to fetch API options');
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    } 
}

// Example utilization for weather API
(async () => {
    try {
        const apiOptions = await fetchApiOptions();

        // Display the API options in the application
        console.log('Weather Forecasting API Options', apiOptions);
    } catch (error) {
        // Handle errors e.g. display an error message to the user
        console.error('Failed to fetch API options:', error.message);
    }
})();