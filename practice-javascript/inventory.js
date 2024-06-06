// Initial inventory
let inventory = [
    { id: 1, name: 'Laptop', quantity: 10, price: 800 },
    { id: 2, name: 'Smartphone', quantity: 20, price: 500 },
    { id: 3, name: 'Tablet', quantity: 15, price: 300 },
];

// Function to add a new product to the inventory
const addProduct = (id, name, quantity, price) => {
    console.log(`Adding ${quantity} ${name}(s) to the inventory...`);
    const newProduct = { id, name, quantity, price };
    inventory.push(newProduct);
    console.log('Product added:', newProduct);
};

// Function to update the quantity of a product in the inventory
const updateQuantity = (productId, newQuantity) => {
    console.log(`Updating quantity of product with ID ${productId}...`);
    const productIndex = inventory.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
        inventory[productIndex].quantity = newQuantity;
        console.log(`Quantity updated to ${newQuantity}`);
    } else {
        console.log('Product not found in inventory');
    }
};

// Function to generate a sales report
const generateSalesReport = () => {
    console.log('Generating sales report...');
    const totalSales = inventory.reduce((total, product) => total + product.quantity * product.price, 0);
    console.log('Total sales:', totalSales);
};

// Add a new product
addProduct(4, 'Printer', 5, 200);

// Update quantity of existing product
updateQuantity(2, 15);

// Generate sales report
generateSalesReport();

// Display the updated inventory
console.log('Updated Inventory:', inventory);