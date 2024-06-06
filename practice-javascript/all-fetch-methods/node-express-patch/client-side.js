// Define a function to trigger the event schedule update on the server
async function updateEventScheduleOnServer(newDate, newTime) {
    try {
      const eventUpdateData = {
        date: newDate,
        time: newTime,
      };
  
      const response = await fetch('/api/event/schedule', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventUpdateData),
      });
  
      if (response.ok) {
        console.log('Event schedule updated successfully.');
      } else {
        throw new Error('Failed to update the event schedule');
      }
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
  
  // Event listener for updating the event's schedule
  document.querySelector('#update-schedule-button').addEventListener('click', async () => {
    const newDate = prompt('Enter the new date for the event:');
    const newTime = prompt('Enter the new time for the event:');
  
    if (newDate && newTime) {
      try {
        await updateEventScheduleOnServer(newDate, newTime);
        // Update the UI or provide feedback to the webpage creators that the schedule has been updated
      } catch (error) {
        // Handle update error, e.g., display an error message to the webpage creators
        console.error('Failed to update the event schedule:', error.message);
      }
    } else {
      console.log('No date or time entered. Schedule not updated.');
    }
  });  