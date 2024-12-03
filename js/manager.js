const productForm = document.getElementById("productForm");
const productTable = document.getElementById("productTable").querySelector("tbody");

let products = [];

// Renderizar productos en la tabla
function renderProducts() {
  productTable.innerHTML = ""; // Limpiar la tabla
  products.forEach((product) => {
    const row = `
      <tr>
        <td>${product.name}</td>
        <td>${product.description}</td>
        <td><img src="${product.image || ''}" alt="${product.name}" style="width: 50px; height: auto;"></td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editProduct(${product.id})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})">Eliminar</button>
        </td>
      </tr>
    `;
    productTable.innerHTML += row;
  });
}

// Obtener productos del servidor
function fetchProducts() {
  fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      renderProducts();
    })
    .catch((error) => console.error("Error al obtener productos:", error));
}

// Agregar o actualizar producto
productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = productForm.dataset.id || null; // Usar el id si está en edición
  const name = document.getElementById("productName").value;
  const description = document.getElementById("productDescription").value;
  const image = document.getElementById("productImage").value;

  const method = id ? "PUT" : "POST";
  const url = id ? `http://localhost:3000/products/${id}` : "http://localhost:3000/products";

  fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description, image }),
  })
    .then(() => {
      fetchProducts(); // Recargar productos
      productForm.reset(); // Limpiar el formulario
      delete productForm.dataset.id; // Limpiar id
    })
    .catch((error) => console.error("Error al guardar producto:", error));
});

// Eliminar producto
function deleteProduct(id) {
  fetch(`http://localhost:3000/products/${id}`, { method: "DELETE" })
    .then(() => fetchProducts())
    .catch((error) => console.error("Error al eliminar producto:", error));
}

// Editar producto
function editProduct(id) {
  const product = products.find((p) => p.id === id);
  if (product) {
    document.getElementById("productName").value = product.name;
    document.getElementById("productDescription").value = product.description;
    document.getElementById("productImage").value = product.image || '';
    productForm.dataset.id = id; // Guardar el id en el formulario
  }
}

// Inicializar
document.addEventListener("DOMContentLoaded", fetchProducts);
