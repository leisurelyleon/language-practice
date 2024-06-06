class Product:
    def __init__(self, product_id, name, price):
        self.product_id = product_id
        self.name = name
        self.price = price

class ShoppingCart:
    def __init__(self):
        self.items = []

    def add_item(self, product, quantity):
        """Add a product and its quantity to the shopping cart."""
        self.items.append({"product": product, "quantity": quantity})
        print(f"Added {quantity} {product.name}(s) to the cart.")

    def remove_item(self, product_id, quantity):
        """Remove a certain quantity of a product from the shopping cart."""
        for item in self.items:
            if item["product"].product_id == product_id:
                if item["quantity"] >= quantity:
                    item["quantity"] -= quantity
                    print(f"Removed {quantity} {item['product'].name}(s) from the cart.")
                    if item["quantity"] == 0:
                        self.items.remove(item)

                else:
                    print("Quantity to remove exceeds the quantity in the cart.")
                return
        print(f"Product with ID {product_id} not found in the cart.")

    def calculate_total(self):
        """Calculate the total price of items in the shopping cart."""
        total = sum(item["product"].price * item["quantity"] for item in self.items)
        return total            
    
class Checkout:
    def __init__(self, shopping_cart):
        self.shopping_cart = shopping_cart
    
    def process_payment(self, payment_amount):
        """Process the payment and complete the checkout."""
        total_amount = self.shopping_cart.calculate_total()

    if payment_amount >= total_amount:
        print(f"Payment successful! Total amount: ${total_amount: .2f}")
        self.shopping_cart.items = [] # Clear the cart after successful payment
    else:
        print("Payment failed. Insufficient funds.")

# Example usage of the shopping cart and checkout system
if __name__ == "__main__":
    # Create some sample products
    laptop = Product(1, "Laptop", 999.99)
    smartphone = Product(2, "Smartphone", 499.99)
    headphones = Product(3, "Headphones", 79.99)

    # Create a shopping cart
    cart = ShoppingCart()

    # Add products to the cart
    cart.add_item(laptop, 2)
    cart.add_item(smartphone, 1)
    cart.add_item(headphones, 3)

    # Display the contents of the cart
    print("Shopping Cart Contents:")
    for item in cart.items:
        print(f"{item['quantity']} x {item['product'].name}")

    # Remove some items from the cart
    cart.remove_item(1, 1)
    cart.remove_item(3, 2)

    # Display the updated contents of the cart
    print("\nUpdated Shopping Cart Contents:")
    for item in cart.items:
        print(f"{item['quantity']} x {item['product'].name}")

    # Create a checkout and process the payment
    checkout = Checkout(cart)
    checkout.process_payment(2000)