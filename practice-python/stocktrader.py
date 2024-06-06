import random

# Define a class to represent a stock trading system
class StockTrader:
    def __init__(self, initial_balance):
        self.balance = initial_balance
        self.portfolio = {}

    def buy_stock(self, stock_symbol, quantity):
        """Purchase a given quantity of a stock."""
        stock_price = random.uniform(50, 200) # Simulated stock price
        total_cost = stock_price * quantity

        if self.balance >= total_cost:
            if stock_symbol in self.portfolio:
                self.portfolio[stock_symbol] += quantity
            else:
                self.portfolio[stock_symbol] += quantity
            self.balance -= total_cost
            print(f"Bought {quantity} shares of {stock_symbol} at ${stock_price} each.")
        else:
            print("Insufficient balance to buy the specified quantity of stock.")

    def sell_stock(self, stock_symbol, quantity):
        """Sell a given quantity of a stock."""
        stock_price = random.uniform(50, 200) # Simulated stock price

        if stock_symbol in self.portfolio and self.portfolio[stock_symbol] >= quantity:
            total_earnings = stock_price * quantity
            self.portfolio[stock_symbol] -= quantity
            self.balance += total_earnings
            print(f"Sold {quantity} shares of {stock_symbol} at ${stock_price} each.")
        else: 
            print("Insufficient shares to sell or the stock is not in the portfolio.")

    def get_portfolio(self):
        """Retrieve the current portfolio with stock holdings."""
        print("Portfolio:")
        for stock_symbol, quantity in self.portfolio.items():
            print(f"{stock_symbol}: {quantity} shares")

# Example utilization of the StockTrader class
if __name__ == "__main__":
    initial_balance = 10000 # Initial balance for the trader
    trader = StockTrader(initial_balance)

    trader.buy_stock("AAPL", 10)
    trader.buy_stock("GOOGL", 5)
    trader.sell_stock("AAPL", 7)
    trader.buy_stock("TSLA", 3)
    trader.get_portfolio()