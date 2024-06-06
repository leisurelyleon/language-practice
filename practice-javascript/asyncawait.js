// Function to simulate user login
const loginUser = async (username, password) => {
    console.log('Logging in...');
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate login delay
    console.log(`Logged in as ${username}`);
    return { userId: 123, username };
};

// Function to fetch user profile data
const fetchUserProfile = async (userId) => {
    console.log('Fetching user profile...');
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate fetch delay
    const userProfile = { userId, firstName: 'Joseph', lastName: 'Edwards', email: 'joseph.edwards@example.com'};
    console.log('Fetched user profile:', userProfile);
    return userProfile;
};

// Function to fetch additional data based on user profile
const fetchAdditionalData = async (userProfile) => {
    console.log('Fetching additional data based on user profile...');
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate fetch delay
    const additionalData = { interests: ['coding', 'reading', 'traveling'] };
    console.log('Fetched additional data:', additionalData);
    return additionalData;
};

// Function to orchestrate chained asynchronous operations
const loginAndFetchData = async (username, password) => {
    try {
        const user = await loginUser(username, password);
        const userProfile = await fetchUserProfile(user.Id);
        const additionalData = await fetchAdditionalData(userProfile);

        // Perform additional operations with the fetched data
        console.log('Combined Data:', {
            user,
            userProfile,
            additionalData,
        });

        // Simulate further asynchronous operations
    } catch (error) {
        console.error(error.message);
    }
};

// Trigger the main chained asynchronous operation
loginAndFetchData('joseph_edwards', 'password123');