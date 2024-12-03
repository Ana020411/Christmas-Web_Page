const apiUrl = 'http://localhost:3000/products';

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();

    document.getElementById('productForm').addEventListener('submit', function(event) {
        event.preventDefault();
        addProduct();
    });
});

function fetchProducts() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#productsTable tbody');
            tableBody.innerHTML = '';
            data.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>${product.category}</td>
                    <td>${product.description}</td>
                    <td><img src="${product.img}" alt="${product.name}" style="width: 50px; height: 50px;"></td>
                    <td>
                        <button onclick="editProduct(${product.id})" class="btn btn-warning btn-sm" style='background-color: rgb(56, 97, 67); border: none; color: rgb(220, 220, 220);'>Editar</button>
                        <button onclick="deleteProduct(${product.id})" class="btn btn-danger btn-sm" style='background-color: #b13b2c: border: none;'>Eliminar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}

function addProduct() {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const category = document.getElementById('productCategory').value;
    const description = document.getElementById('productDescription').value;
    const img = document.getElementById('productImage').value;

    const product = {
        name,
        price,
        category,
        description,
        img
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(() => {
        fetchProducts();
        document.getElementById('productForm').reset();
    })
    .catch(error => console.error('Error adding product:', error));
}

function editProduct(id) {
    const newName = prompt('Nuevo nombre del producto:');
    const newPrice = prompt('Nuevo precio del producto:');
    const newCategory = prompt('Nueva categoría del producto:');
    const newDescription = prompt('Nueva descripción del producto:');
    const newImg = prompt('Nueva URL de la imagen del producto:');
    
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newName,
            price: newPrice,
            category: newCategory,
            description: newDescription,
            img: newImg
        })
    })
    .then(response => response.json())
    .then(() => fetchProducts())
    .catch(error => console.error('Error editing product:', error));
}

function deleteProduct(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(() => fetchProducts())
    .catch(error => console.error('Error deleting product:', error));
}