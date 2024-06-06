class Product {
    constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
    }
  }
  
  class ShoppingCart {
    constructor() {
      this.items = [];
    }
  
    async addItem(product, quantity) {
      // Simulate an asynchronous operation (e.g. fetching product data from a server)
      const productData = await fetchProductData(product.id);
  
      if (!productData) {
        throw new Error(`Product with ID ${product.id} not found.`);
      }
  
      const item = {
        product: product,
        quantity: quantity,
      };
  
      this.items.push(item);
      console.log(`${quantity} ${product.name}(s) added to the cart.`);
    }
  
    removeItem(productId) {
      const itemIndex = this.items.findIndex(item => item.product.id === productId);
      if (itemIndex !== -1) {
        this.items.splice(itemIndex, 1);
        console.log(`Product with ID ${productId} removed from the cart.`);
      } else {
        console.log(`Product with ID ${productId} not found in the cart.`);
      }
    }
  
    calculateTotal() {
      return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }
  
    async checkout() {
      const total = this.calculateTotal();
      console.log(`Checking out... Total: $${total.toFixed(2)}`);
  
      // Simulate an asynchronous payment process
      await processPayment(total);
  
      console.log('Payment successful. Thank you for your purchase!');
      this.items = []; // Empty the cart after successful checkout
    }
  }
  
  async function fetchProductData(productId) {
    // Simulate fetching product data from a server
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const products = [
          new Product(1, 'Laptop', 999.99),
          new Product(2, 'Phone', 599.99),
          new Product(3, 'Headphones', 99.99),
        ];
  
        const product = products.find(p => p.id === productId);
        resolve(product);
      }, 1000);
    });
  }
  
  async function processPayment(total) {
    // Simulate a payment process
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.9) {
          resolve();
        } else {
          reject('Payment failed. Please try again.');
        }
      }, 1500);
    });
  }
  
  const cart = new ShoppingCart();
  
  (async () => {
    try {
      await cart.addItem(new Product(1, 'Laptop', 1), 2);
      await cart.addItem(new Product(2, 'Phone', 2), 1);
      cart.removeItem(3);
      await cart.checkout();
    } catch (error) {
      console.error(error);
    }
  })();  