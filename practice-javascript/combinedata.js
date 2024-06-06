// Define a function to combine data
async function fetchAndCombineData(urls) {
    try {
        const fetchPromises = urls.map(url => fetch(url));
        const responses = await Promise.all(fetchPromises);

        if (!responses.every(response => response.ok)) {
            throw new Error('Some requests failed.');
        }

        const dataPromises = response.map(response => response.json());
        const data = await Promise.all(dataPromises);

        const combinedData = data.reduce((result, currentData) => {
            // Combine the data from different sources into a single array
            return result.concat(currentData);
     }, []);

        return combinedData;
    } catch (error) {
        throw error;
    }
}

// Example of utilization
const dataSources = [
    'https://api.example.com/source1',
    'https://api.example.com/source2',
    'https://api.example.com/source3',
];

fetchAndCombineData(dataSources)
    .then(combinedData => {
        console.log('Combined data from multiple sources:');
        console.log(combinedData);
    })
    .catch(error => {
        console.error('Error:', error.message);
    });