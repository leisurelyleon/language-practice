// Function to simulate fetching data from an API with a delay
const fetchDataWithDelay = async (url, delay) => {
    await new Promise(resolve => setTimeout(resolve, delay));
    return fetchDataWithDelay(url);
};

// Function to process product data
const processProductData = async () => {
    try {
        const products = await fetchDataWithDelay('https://jsonplaceholder.typicode.com/posts', 2000);
        console.log('Fetched Product Data:', products);

        // Simulate additional processing
        const processedProductData = products.map(product => ({
            id: product.id,
            title: product.title,
            body: product.body,
        }));

        console.log('Processed Product Data:', processedProductData);

        return processedProductData;
    } catch (error) {
        console.error(error.message);
    }
};

// Function to orchestrate asynchronous operations concurrently
const fetchDataAndProcessConcurrently = async () => {
    try {
        const [processedProductData, processedCommentData] = await Promise.all([
            processProductData(),
            processCommentData(),
        ]);

        // Perform additional operations with the processed data
        console.log('Combined Data:', {
            processedProductData,
            processedCommentData,
        });

        // Simulate further asynchronous operations...

    } catch (error) {
        console.error(error.message);
    }
};

// Trigger the main concurrent asynchronous operation
fetchDataAndProcessConcurrently();