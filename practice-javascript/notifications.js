// Function to request permission for notifications
const requestNotificationPermission = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            console.log('Notification permission granted');
            return true;
        } else {
            console.warn('Notification permission denied.');
            return false;
        }
    } catch (error) {
        console.error('Error requesting notification permission:', error);
        return false;
    }
};

// Function to display a notification
const showNotification = (title, options) => {
    if (Notification.permission === 'granted') {
        const notification = new Notification(title, options);
        return notification;
    } else {
        console.warn('Notification not allowed.');
        return null;
    }
};

// Function to fetch updates and display a notification
const fetchAndNotifyUpdates = async (updateType) => {
    try {
        // Simulate fetching updates with a fetch request
        const response = await fetch('https://api.example.com/updates');
        const updates = await response.json();

        // Check if there are new updates
        if (updates.length > 0) {
            const title = `New ${updateType} Update`;
            const options = {
                body: `Check out the latest ${updateType} updates!`,
                icon: `notification-icon.png`, // Replace with actual icon URL
            };

            // Display the notification
            showNotification(title, options);
        } else {
            console.log('No new updates.');
        }
    } catch (error) {
        console.error('Error fetching updates:', error);
    }
};

// Example Utilization

// Assume you have a button id "notifyButton" on your webpage
const notifyButton = document.getElementById('notifyButton');

// Attack a click event listener to the button
notifyButton.addEventListener('click', async () => {
    const permissionGranted = await requestNotificationPermission();

    if (permissionGranted) {
        // Specify the type of updates (e.g. 'Emails', 'News', 'Music')
        const updateType = 'Updates';

        // Fetch and notify updates
        fetchAndNotifyUpdates(updateType);
    }
});