import random

# Define a class to represent a cryptocurrency trader
class CryptoTrader:
    def __init__(self, initial_balance, blockchain):
        self.balance = initial_balance
        self.blockchain = blockchain

    def buy_crypto(self, crypto_symbol, amount):
        """Purchase a given amount of a cryptocurrency."""
        crypto_price = random.uniform(50, 2000) # Simulated crypto price
        total_cost = crypto_price * amount

        if self.balance >= total_cost:
            transaction = {
                "type": "buy",
                "crypto": crypto_symbol,
                "amount": amount,
                "price": crypto_price,
            }
            self.blockchain.append(transaction)
            self.balance -= total_cost
            print(f"Bought {amount} {crypto_symbol} at ${crypto_price} each.")
        else:
            print("Insufficient balance to buy the specified amount of cryptocurrency.")

        def sell_crypto(self, crypto_symbol, amount):
            """Sell a given amount of cryptocurrency."""
            crypto_price = random.uniform(50, 2000) # Simulated crypto price

            if self.has_crypto(crypto_symbol, amount):
                transaction = {
                    "type": "sell",
                    "crypto": crypto_symbol,
                    "amount": amount,
                    "price": crypto_price,
                }
                self.blockchain.append(transaction)
                self.balance += crypto_price * amount
                print(f"Sold {amount} {crypto_symbol} at ${crypto_price} each.")
            else:
                print("Insufficient cryptocurrency to sell or the cryptocurrency is not in the wallet.")

        def has_crypto(self, crypto_symbol, amount):
            """Check if the wallet has a sufficient amount of a cryptocurrency."""
            crypto_balance = sum(
                transaction["amount"]
                for transaction in self.blockchain
                if transaction["crypto"] == crypto_symbol and transaction["type"] == "buy"
            )
            return crypto_balance >= amount
        def get_wallet(self):
            """Retrieve the current wallet with cryptocurrency holdings."""
            wallet = {}
            for transaction in self.blockchain:
                crypto_symbol = transaction["crypto"]
                amount = transaction["amount"]
                if crypto_symbol in wallet:
                    wallet[crypto_symbol] += amount
                else:
                    wallet[crypto_symbol] = amount
            return wallet

# Example utilization of the CryptoTrader class
if __name__ == "__main__":
    initial_balance = 10000 # Initial balance for the crypto trader
    blockchain = [] # A list to represent the blockchain

    trader = CryptoTrader(initial_balance, blockchain)

    trader.buy_crypto("BTC", 0.1)
    trader.buy_crypto("ETH", 2)
    trader.sell_crypto("BTC", 0.05)

    wallet = trader.get_wallet()
    print("Current wallet holdings:")
    for crypto_symbol, amount in wallet.items():
        print(f"{crypto_symbol}: {amount} units")