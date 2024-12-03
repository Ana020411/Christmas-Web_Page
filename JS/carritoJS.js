// Simulated user credentials
const validUsers = [
    { username: 'usuario1', password: 'navidad2024' },
    { username: 'usuario2', password: 'fiesta2024' }
];

// Cart items and cart state
let cart = [];

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('loginError');
    
    const user = validUsers.find(u => u.username === username && u.password === password);
    
    if (user) {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('cartSection').style.display = 'block';
        loginError.style.display = 'none';
    } else {
        loginError.style.display = 'block';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const cartSection = document.getElementById('cartSection'); // Cart container
    const cartItems = JSON.parse(localStorage.getItem('cart')) || []; // Read cart from localStorage

    // Modify cart items to include quantity and total
    const processedCartItems = cartItems.map(product => ({
        ...product,
        quantity: 1, // Default quantity is 1
        total: product.price // Total is initially the same as the product price
    }));

    if (processedCartItems.length === 0) {
        cartSection.innerHTML = '<p>No hay productos en el carrito.</p>';
        return;
    }

    // Calculate overall cart total
    const cartTotal = processedCartItems.reduce((sum, item) => sum + item.total, 0);

    // Create cart HTML with quantity and total
    cartSection.innerHTML = `
        ${processedCartItems.map(product => `
            <div class="cart-item">
                <h5>${product.name}</h5>
                <p>${product.description}</p>
                <div class="cart-item-details">
                    <p>Precio unitario: $${product.price} MXN</p>
                    <p>Cantidad: ${product.quantity}</p>
                    <p>Total: $${product.total} MXN</p>
                    <div class="quantity-controls">
                        <button onclick="decreaseQuantity('${product.name}')">-</button>
                        <button onclick="increaseQuantity('${product.name}')">+</button>
                    </div>
                </div>
            </div>
        `).join('')}
        <div class="cart-summary">
            <h4>Total del Carrito: $${cartTotal} MXN</h4>
        </div>
    `;
});

// Function to increase quantity
function increaseQuantity(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.map(product => {
        if (product.name === productName) {
            // If product is found, create a new object with updated quantity and total
            return {
                ...product,
                quantity: (product.quantity || 1) + 1,
                total: product.price * ((product.quantity || 1) + 1)
            };
        }
        return product;
    });

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    // Reload the page to update the cart display
    location.reload();
}

// Function to decrease quantity
function decreaseQuantity(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.map(product => {
        if (product.name === productName) {
            // Ensure quantity doesn't go below 1
            const newQuantity = Math.max(1, (product.quantity || 1) - 1);
            return {
                ...product,
                quantity: newQuantity,
                total: product.price * newQuantity
            };
        }
        return product;
    });

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    // Reload the page to update the cart display
    location.reload();
}