// Credenciales de usuario simuladas
const validUsers = [
    { username: 'usuario1', password: 'navidad2024' },
    { username: 'usuario2', password: 'fiesta2024' }
];

// Estado inicial del carrito
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Manejo del inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('loginError');
    
    const user = validUsers.find(u => u.username === username && u.password === password);
    
    if (user) {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('cartSection').style.display = 'block';
        loginError.style.display = 'none';
        updateCartDisplay(); // Actualiza el carrito al iniciar sesión
    } else {
        loginError.style.display = 'block';
    }
});

// Agregar producto al carrito
function addToCart(product) {
    // Busca si el producto ya está en el carrito
    const existingProduct = cart.find(item => item.name === product.name);
    
    if (existingProduct) {
        // Incrementa la cantidad y actualiza el total
        existingProduct.quantity += 1;
        existingProduct.total = existingProduct.price * existingProduct.quantity;
    } else {
        // Agrega el producto con cantidad inicial 1
        cart.push({
            ...product,
            quantity: 1, // Inicializa la cantidad en 1
            total: product.price // Inicializa el total con el precio unitario
        });
    }

    // Guarda el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Producto "${product.name}" agregado al carrito.`);
    updateCartDisplay(); // Actualiza la vista del carrito
}

// Mostrar productos en el carrito
function updateCartDisplay() {
    const cartSection = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    
    cartSection.innerHTML = ''; // Limpia la vista anterior
    
    if (cart.length === 0) {
        cartSection.innerHTML = '<p>No hay productos en el carrito.</p>';
        cartTotalSpan.textContent = '0.00';
        return;
    }
    
    let total = 0;
    cart.forEach(product => {
        total += product.total; // Suma el total del carrito
        
        // Crea el HTML para cada producto
        const row = `
            <tr>
                <td>${product.name}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity('${product.name}', -1)">-</button>
                    ${product.quantity}
                    <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity('${product.name}', 1)">+</button>
                </td>
                <td>$${product.total.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="removeFromCart('${product.name}')">Eliminar</button>
                </td>
            </tr>
        `;
        cartSection.innerHTML += row;
        cartTotalSpan.textContent = total.toFixed(2);

    });

    // Actualiza el total del carrito
    cartTotalSpan.textContent = total.toFixed(2);
    localStorage.setItem('cart', JSON.stringify(cart)); // Guarda el estado actualizado
}

// Cambiar la cantidad de un producto
function changeQuantity(productName, change) {
    cart = cart.map(product => {
        if (product.name === productName) {
            const newQuantity = Math.max(1, product.quantity + change); // Evita cantidades menores a 1
            return {
                ...product,
                quantity: newQuantity,
                total: product.price * newQuantity
            };
        }
        return product;
    });

    updateCartDisplay(); // Actualiza la vista
}

// Eliminar un producto del carrito
function removeFromCart(productName) {
    cart = cart.filter(product => product.name !== productName); // Filtra el producto a eliminar
    updateCartDisplay(); // Actualiza la vista
}

// Manejo del botón de checkout
document.getElementById('checkoutBtn').addEventListener('click', function () {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    alert('Gracias por tu compra. Procederemos al pago.');
    cart = []; // Limpia el carrito después del pago
    updateCartDisplay();
});

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', updateCartDisplay);
