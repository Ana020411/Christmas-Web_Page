const productForm = document.getElementById("productForm");
const productTable = document.getElementById("productTable").querySelector("tbody");

let products = JSON.parse(localStorage.getItem("products")) || [];

// Renderizar productos en la tabla
function renderProducts() {
    productTable.innerHTML = "";
    products.forEach((product, index) => {
        const row = `
            <tr>
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td><img src="${product.image}" alt="${product.name}" style="width: 50px; height: auto;"></td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editProduct(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">Eliminar</button>
                </td>
            </tr>
        `;
        productTable.innerHTML += row;
    });
}

// Agregar/Editar producto
productForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("productName").value;
    const description = document.getElementById("productDescription").value;
    const image = document.getElementById("productImage").value;

    const existingIndex = products.findIndex((p) => p.name === name);
    if (existingIndex !== -1) {
        products[existingIndex] = { name, description, image }; // Editar producto
    } else {
        products.push({ name, description, image }); // Agregar producto
    }
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
    productForm.reset();
});

// Eliminar producto
function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
}

// Editar producto
function editProduct(index) {
    const product = products[index];
    document.getElementById("productName").value = product.name;
    document.getElementById("productDescription").value = product.description;
    document.getElementById("productImage").value = product.image;
}

document.addEventListener("DOMContentLoaded", renderProducts);
