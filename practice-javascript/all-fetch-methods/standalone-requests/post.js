// Define a function to make an asynchronous request to the reservation API
async function bookReservation(customerName, selectedDate, selectedTime) {
    try {
        const response = await fetch('/api/reservations', {
            method: 'POST',
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
        throw new Error('Failed to book reservation');
    } 
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

// Event listener for when the user submits reservation form
document.querySelector('#reservation-form').addEventListener('submit', async (event => {
    event.preventDefault();
}))

    const customerName = document.querySelector('#customer-name').value;
    const selectedDate = document.querySelector('#date-dropdown').value;
    const selectedTime = document.querySelector('#time-selection').value;

    try {
        const bookingResult = await bookReservation(customerName, selectedDate, selectedTime);

        // Display a success message or handle the response accordingly
        console.log('Thank you for reserving your table! We look forward to serving you!:', bookingResult);
    } catch (error) {
        // Handle booking error e.g. display an error message to the user
        console.error('Sorry. The date and time you selected is not available. Please try again later or change your scheduling.:', error.message);
    }

// Function to make a fetch request to check available reservation slots
function checkAvailability(selectedDate, selectedTime) {
    return new Promise((resolve, reject) => {
        fetch(`/api/availability?date=${selectedDate}&time=${selectedTime}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to check availability');
            }
            return response.json();
        })
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        });
    });
}