document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/products';
    const featuredProductsContainer = document.querySelector('#featured-products .row');

    if (!featuredProductsContainer) {
        console.error('❌ CRITICAL: Product container not found in HTML');
        return;
    }

    // Fetch products from your Express backend
    fetch(apiUrl)
        .then(response => {
            console.log('📡 Fetch Response:', response);
            
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Important: Your backend might return data in a different structure
            // You might need to adjust this based on your actual response
            const products = data; // or data.products, depending on your backend response

            console.log('🔍 Total Products:', products.length);
            console.log('📊 Product Sample:', products.slice(0, 3));

            // More flexible category matching
            const treeProducts = products; 

            console.log('🌲 Tree Products Found:', treeProducts.length);
            console.log('🌲 Tree Products Details:', treeProducts);

            if (treeProducts.length === 0) {
                featuredProductsContainer.innerHTML = `
                    <div class="col-12">
                        <div class="alert alert-warning">
                            ⚠️ No tree products found. Check your database entries.
                            Available categories: ${[...new Set(products.map(p => p.category))].join(', ')}
                        </div>
                    </div>
                `;
                return;
            }

            // Populate products
            featuredProductsContainer.innerHTML = treeProducts.map(product => `
                <div class="col-12 col-md-4 mb-4">
                    <div class="card h-100 shadow-sm">
                        <img src="../../assets/img/arboles/${product.img}" alt="${product.name}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text">$${product.price} MXN</p>
                            <button class="btn btn-primary w-100" style="background-color: #b33c3c; color: white;" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">Agregar al Carrito</button>
                        </div>
                    </div>
                </div>
            `).join('');

            let cart = JSON.parse(localStorage.getItem('cart')) || []; // Inicializar carrito desde localStorage

            window.addToCart = function (product) {
                cart.push(product); // Agregar producto al carrito
                localStorage.setItem('cart', JSON.stringify(cart)); // Guardar carrito en localStorage
                alert(`Producto "${product.name}" agregado al carrito`);
                console.log('Carrito actual:', cart);
            };
            
        })
        .catch(error => {
            console.error('❌ Fetch Error:', error);
            featuredProductsContainer.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-danger">
                        Error:  ${error.message}
                    </div>
                </div>
            `;
        });
});