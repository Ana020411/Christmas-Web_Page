function agregarAlCarrito(nombreProducto, precioProducto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    let productoExistente = carrito.find(p => p.nombre === nombreProducto);
    
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({
            nombre: nombreProducto, 
            precio: precioProducto, 
            cantidad: 1
        });
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    window.location.href = 'pages/Carrito.html';
}

document.addEventListener('DOMContentLoaded', function() {
    const botonesCarrito = document.querySelectorAll('.btn-agregar-carrito');
    
    botonesCarrito.forEach(boton => {
        boton.addEventListener('click', function(event) {
            event.preventDefault(); 
            
            const card = this.closest('.card');
            const nombreProducto = card.querySelector('.card-title').textContent;
            const precioProducto = parseFloat(card.querySelector('.card-text').textContent.replace('$', '') || 0);
            
            agregarAlCarrito(nombreProducto, precioProducto);
        });
    });
});