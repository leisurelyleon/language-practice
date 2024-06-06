// Define a function to update an existing reservation
async function updateReservation(reservationId, customerName, selectedDate, selectedTime) {
    try {
        const response = await fetch(`/api/reservations/${reservationId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customerName,
                selectedDate,
                selectedTime,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to update reservation');
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

// Event listener for when the user submits an update reservation form
document.querySelector('#update-reservation-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const reservationId = document.querySelector('#reservation-id').value; // Get reservation ID
    const customerName = document.querySelector('#customer-name').value;
    const selectedDate = document.querySelector('#date-dropdown').value;
    const selectedTime = document.querySelector('#time-selection').value;

    try {
        const updateResult = await updateReservation(reservationId, customerName, selectedDate, selectedTime);

        // Display a success message or handle the response accordingly
        console.log('Your reservation has been updated successfully:', updateResult);
    } catch (error) {
        // Handle update error e.g. display an error message to the user
        console.error('Failed to update reservation. Please try again later or contact support:', error.message);
    }
});