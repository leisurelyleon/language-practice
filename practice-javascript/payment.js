// Define a function to fetch payment methods
async function fetchPaymentMethods() {
    try {
        const response = await fetch('/api/payment/methods', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer your-access-token', // Replace with a valid access token
            },
        });

        if (response.ok) {
            const paymentMethods = await response.json();
            return paymentMethods;
        } else {
            throw new Error('Failed to fetch payment methods');
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

// Define a function to fetch payment history
async function fetchPaymentHistory() {
    try {
        const response = await fetch('/api/payment/history', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer your-access-token', // Replace with a valid access token
            }
        });

        if (response.ok) {
            const paymentHistory = await response.json();
            return paymentHistory;
        } else {
            throw new Error('Failed to fetch payment history');
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

// Example of utilization
(async () => {
    try {
        const paymentMethods = await fetchPaymentMethods();
        console.log('Payment Methods:', paymentMethods);

        const paymentHistory = await fetchPaymentHistory();
        console.log('Payment History:', paymentHistory);
    } catch (error) {
        console.error('Payment API request failed:', error.message);
    }
})();