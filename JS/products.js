function fetchProducts() {
    fetch('/api/productos')
      .then(response => response.json())
      .then(data => {
        displayProducts(data);
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
      });
  }
  function displayProducts(products) {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = ''; // Limpiar el contenedor
  
    products.forEach(product => {
      const productElement = document.createElement("div");
      productElement.className = "col-12 col-md-4 mb-4";
      productElement.innerHTML = `
        <div class="card h-100 shadow-sm transition-all hover:shadow-lg">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title" style="font-family: 'Cinzel', serif;">${product.name}</h5>
            <p class="card-text" style="font-family: 'Lora', serif;">${product.description}</p>
            <a href="#" class="btn w-100" style="background-color: #b13b2c; color: white; font-family: 'Lora', serif;">Agregar al Carrito</a>
          </div>
        </div>
      `;
      productContainer.appendChild(productElement);
    });
  }
  document.addEventListener('DOMContentLoaded', fetchProducts);