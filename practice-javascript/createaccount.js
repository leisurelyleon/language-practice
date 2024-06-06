function createAccount() {
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name ="password"]').value;

    // Check if the email and password meet validation criteria
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address')
        return;
    }

    if (!isValidPassword(password)) {
        alert('Please enter a valid password (e.g., at least 8 characters).');
        return;
    }

    // Replace 'https://api.example.com/register' with actual registration endpoint
    const url = 'https://api.example.com/register';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => {
        if(response.ok) {
            alert('Account created successfully. You can sign in.');
            // Optionally redirect the user to the login page
            // window.location.href = '/login.html';
        } else {
            alert('Failed to create the account. Please try again later.');
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

// Function to validate a password
function isValidPassword(password) {
    return password.length >= 8;
}