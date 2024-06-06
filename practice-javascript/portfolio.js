// Financial Analytics Module
class Portfolio {
    constructor(initialInvestment, allocations) {
        this.initialInvestment = initialInvestment;
        this.allocations = allocations;
        this.portfolio = 0;
    }

    async fetchHistoricalStockPrices(stockSymbols, startDate, endDate) {
        // Simulating asynchronous data fetching from an external API
        // In a real-world scenario, you would use fetch or another async mechanism
        const stockPrices = await externalApi.getStockPrices(stockSymbols, startDate, endDate);
        return stockPrices;
    }

    calculatePortfolioValue(stockPrices) {
        this.portfolioValue = Object.entries(this.allocations).reduce((value, [symbol, allocation]) => {
            const stockPrice = stockPrices[symbol];
            return value + (allocation * this.initialInvestment * stockPrice);
        }, 0);
    }

    async analyzePortfolioPerformance(startDate, endDate) {
        const stockSymbols = Object.keys(this.allocations);

        try {
            const stockPrices = await this.fetchHistoricalStockPrices(stockSymbols, startDate, endDate);
            this.calculatePortfolioValue(stockPrices);
            this.displayResults();
        } catch (error) {
            console.error('Error fetching stock prices:', error);
        }
    }

    displayResults() {
        console.log(`Portfolio Value: $${this.portfolioValue.toFixed(2)}`);
        console.log('Allocation Details:');
        Object.entries(this.allocations).forEach(([symbol, allocation]) => {
            console.log(`${symbol}: ${allocation * 100}%`);
        });
    }
}

// External API Simulator
const externalApi = {
    getStockPrices: async (stockSymbols, startDate, endDate) => {
        // Simulating API response with random stock prices
        const stockPrices = {};
        stockSymbols.forEach(symbol => {
            const price = Math.random() * (100 - 10) + 10; // Random prices between 10 and 100
            stockPrices[symbol] = price;
        });
        return stockPrices;
    },
};

// Example Usage
const initialInvestment = 10000;
const allocations = {
    AAPL: 0.4,
    GOOGL: 0.3,
    MSFT: 0.2,
    AMZN: 0.1,
};

const myPortfolio = new Portfolio(initialInvestment, allocations);
myPortfolio.analyzePortfolioPerformance('2023-01-01', '2023-12-31');