// Simulated user credentials
const validUsers = [
    { username: 'usuario1', password: 'navidad2024' },
    { username: 'usuario2', password: 'fiesta2024' }
];

// Cart items and cart state
let cart = [];
document.addEventListener('DOMContentLoaded', () => {
    // Cargar carrito desde localStorage al cargar la página
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}); 

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
function addToCart(product) {
    // Asegúrese de que el producto tenga la estructura correcta
    const cartProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
    };

    const existingProduct = cart.find(item => item.id === cartProduct.id);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(cartProduct);
    }
    
    // Guardar en localStorage para persistencia entre páginas
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartDisplay();
    
    alert(`${product.name} agregado al carrito`);
}

// Expose the function globally
window.addProductToCart = addToCart;

// Update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    
    // Limpiar los elementos existentes
    cartItemsContainer.innerHTML = '';
    
    // Poblar los elementos del carrito
    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const row = `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Eliminar</button>
                </td>
            </tr>
        `;
        cartItemsContainer.innerHTML += row;
    });
    
    // Actualizar el total
    cartTotalSpan.textContent = total.toFixed(2);
}

function addProductToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    
    // Mostrar una alerta de que el producto fue agregado
    alert(`${product.name} agregado al carrito`);
}

// Exponer la función globalmente
window.addProductToCart = addProductToCart;


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
window.addToCart = function(product) {
    window.addProductToCart(product);
};