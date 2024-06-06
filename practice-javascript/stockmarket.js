// Simulated data for demonstration purposes
const stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25, change: 1.20 },
    { symbol: 'GOOGL', name: 'Google LLC.', price: 2800.50, change: -3.75 },
    { symbol: 'MSFT', name: 'Microsoft Corporation', price: 300.75, change: 0.80 },
    // Add more stock data as needed
];

// Function to calculate net worth based on the number of shares
function calculateNetWorth(symbol, shares) {
    const stock = stocks.find(stock => stock.symbol === symbol);
    if (stock) {
        return stock.price * shares;
    }
    return 0;
}

// Function to update stock price and display changes
function updateStockPrice(symbol, newPrice) {
    const stock = stocks.find(stock => stock.symbol === symbol);
    if (stock) {
        const priceChange = newPrice - stock.price;
        stock.price = newPrice;
        stock.change = priceChange.toFixed(2);
        console.log(`Updated ${symbol} stock price to ${newPrice.toFixed(2)}. Change: ${priceChange.toFixed(2)}`);
    } else {
        console.error(`Stock with symbol ${symbol} not found.`);
    }
}

// Function to display stock information
function displayStockInfo(symbol) {
    const stock = stocks.find(stock => stock.symbol === symbol);
    if (stock) {
        console.log(`${stock.name} (${stock.symbol}): $${stock.price.toFixed(2)} (${stock.change}%)`);
    } else {
        console.error(`Stock with symbol ${symbol} not found.`);
    }
}

// Simulated user interactions
updateStockPrice('AAPL', 152.50);
displayStockInfo('AAPL');

const userNetWorth = calculateNetWorth('GOOGL', 5);
console.log(`User's net worth in Google LLC. (GOOGL): $${userNetWorth.toFixed(2)}`);