// Function to fetch product data from the server
async function fetchProducts() {
    try {
        const response = await fetch('https://api.example.com/products');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Function to display products on the webpage
function displayProducts(products) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price}</p>
        <button onclick="addToCard(${product.id})">Add to Cart</button>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Function to add items to the cart
function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(cart.length);
}

// Function to update the cart count on the webpage
function updateCartCount(count) {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = count;
}

// Function to process the order
async function processOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount.textContent = count;
}

// Function to process the order
async function processOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty. Add items before placing an order.');
        return;
    }

    try {
        const response = await fetch('https://api.example.com/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ products: cart }),
        });

        const orderConfirmation = await response.json();
        alert(`Order placed successfully! Order ID: ${orderConfirmation.orderId}`);
        localStorage.removeItem('cart');
        updateCartCount(0);
    } catch (error) {
        console.error('Error processing order:', error);
    }
}

// Initialize the webpage
function init() {
    fetchProducts();
    updateCartCount(JSON.parse(localStorage.getItem('cart'))?.length || 0);
}

// Event listener for order button
const orderButton = document.getElementById('order-button');
orderButton.addEventListener('click', processOrder);

// Call init function when the page loads
window.onload = init;