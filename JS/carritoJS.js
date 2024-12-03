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

// Function to add items to cart (to be called from product pages)
function addToCart(productName, price) {
    const existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });
    }
    
    updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    
    // Clear existing items
    cartItemsContainer.innerHTML = '';
    
    // Populate cart items
    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const row = `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity(${index}, -1)">-</button>
                    ${item.quantity}
                    <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity(${index}, 1)">+</button>
                </td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Eliminar</button>
                </td>
            </tr>
        `;
        cartItemsContainer.innerHTML += row;
    });
    
    cartTotalSpan.textContent = total.toFixed(2);
}

// Change quantity of cart items
function changeQuantity(index, change) {
    cart[index].quantity += change;
    
    // Remove item if quantity becomes zero
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    updateCartDisplay();
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// Checkout button
document.getElementById('checkoutBtn').addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    alert('Gracias por tu compra. Procederemos al pago.');
    cart = []; // Clear cart after checkout
    updateCartDisplay();
});

// Simulate adding products from other pages (you would call this from product pages)
window.addToCart = addToCart;
