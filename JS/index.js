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


const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();

// Configurar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static("public"));

// Conexión a la base de datos
const db = mysql.createConnection({
    HOST : "127.0.0.1", //http://web.host.com:123
    USER: "root",
    PASSWORD: "", //tu password de root va aqui
    DB: "mysql" 
});

// Verificar conexión
db.connect((err) => {
  if (err) {
    console.error("Error al conectar con la base de datos:", err.message);
    process.exit(1);
  }
  console.log("Conectado a la base de datos.");
});

// Ruta base para API
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html"); // Opcional, si quieres servir este archivo directamente
});

// Ruta para obtener productos
app.get("/products", (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener los productos:", err.message);
      res.status(500).send("Error al obtener los productos.");
      return;
    }
    res.json(results);
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servicio funcionando en http://localhost:${PORT}`);
});

