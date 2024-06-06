function forgotPassword() {
    const email = document.querySelector('input[name="email"]').value;

    // Check if email is valid
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Replace 'https://api.example.com/reset-password' with actual password reset endpoint
    const url = 'https://api.example.com/reset-password';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    })
    .then(response => {
        if (response.ok) {
            alert('Password reset email sent. Please check your inbox.');
        } else {
            alert('Failed to initiate password reset. Please try again later.');
        }
    })
    .catch(error => {
        console.error('Network error:', error);
        alert('An error occurred. Please try again later.');
    });
}

// Function to validate an email address
function isValidEmail(email) {
    const emailPattern = /^[a-zA-ZO-9._-]+@[a-zA-ZO-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}