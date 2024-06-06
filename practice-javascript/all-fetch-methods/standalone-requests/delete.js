// Define a function to delete a message
async function deleteMessage(messageId) {
    try {
        const response = await fetch(`/api/messages/${messageId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log('Message deleted successfully.');
        } else {
            throw new Error('Failed to delete the message');
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

// Event listener for deleting a message
document.querySelector('#delete-message-button').addEventListener('click', async () => {
    const messageId = prompt('Enter the ID of the message you want to delete:');

    if (messageId) {
        try {
            await deleteMessage(messageId);
            // Update the UI or provide feedback to the user that the message has been deleted
        } catch (error) {
            // Handle delete error e.g. display an error message to the user
            console.error('Failed to delete the message:', error.message);
        }
    } else {
        console.log('No message ID entered. Message not deleted.');
    }
});