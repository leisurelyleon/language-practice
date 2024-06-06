// Online Marketplace Simulation
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.shoppingCart = [];
    }

    addToCart(product) {
        this.shoppingCart.push(product);
        console.log(`${product.name}  added to ${this.username}'s shopping cart.`);
    }

    checkout() {
        console.log(`${this.username} is checking out with the following items:`);
        this.shoppingCart.forEach((product) => {
            console.log(`${product.name} - $${product.price}`);
        });
        console.log(`Total: $${this.calculateTotal()}`);
        this.shoppingCart = [];
    }

    calculateTotal() {
        return this.shoppingCart.reduce((total, product) => total + product.price, 0);
    }
}

class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class Marketplace {
    constructor() {
        this.users = [];
        this.products = [];
    }

    async login(username, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = this.users.find((u) => u.username === username && u.password === password);
                if (user) {
                    resolve(user);
                } else {
                    reject(new Error('Invalid username or password.'));
                }
            }, 1000);
        });
    }

    async loadProducts() {
        // Simulating asynchronous product data fetching
        return new Promise((resolve) => {
            setTimeout(() => {
                const products = [
                    new Product(1, 'Laptop', 1200),
                    new Product(2, 'Smartphone', 800),
                    new Product(3, 'Headphones', 150),
                ];
                this.products = products;
                resolve(products);
            }, 1500);
        });
    }

    async displayProducts() {
        console.log('Available Products:');
        const products = await this.loadProducts();
        products.forEach((product) => {
            console.log(`${product.id}. ${product.name} - $${product.price}`);
        });
    }
}

// Example Usage
const marketplace = new Marketplace();

const user1 = new User('user1', 'password123');
const user2 = new User('user2', 'password321');

marketplace.users.push(user1, user2);

marketplace.login('user1', 'password123')
    .then(async (loggedInUser) => {
        console.log(`${loggedInUser.username} logged in successfully.`);
        await marketplace.displayProducts();
        loggedInUser.addToCart(marketplace.products[0]);
        loggedInUser.addToCart(marketplace.products[2]);
        loggedInUser.checkout();
    })
    .catch((error) => {
        console.error(error.message);
    });