const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Configurar conexión a la base de datos
const conexion = mysql.createConnection({
    host: "localhost",
    database: "mysql",
    user: "root",
    password: ""
});

// Conectar a la base de datos
conexion.connect((error) => {
    if (error) {
        console.error("Error al conectar con la base de datos:", error);
        return;
    }
    console.log("Conexión exitosa con la base de datos");
});

// **GET**: Obtener todos los productos
app.get("/products", (req, res) => {
    const query = "SELECT * FROM products";
    conexion.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: "Error al obtener los productos" });
        } else {
            res.json(results);
        }
    });
});

// **POST**: Agregar un nuevo producto
app.post("/products", (req, res) => {
    const { name, price } = req.body; // Supongamos que la tabla tiene columnas "name" y "price"
    const query = "INSERT INTO products (id, name, category, description) VALUES (?, ?)";
    conexion.query(query, [id, name, category, description], (error, results) => {
        if (error) {
            res.status(500).json({ error: "Error al insertar el producto" });
        } else {
            res.status(201).json({ message: "Producto agregado", id: results.insertId });
        }
    });
});

// **PUT**: Actualizar un producto por ID
app.put("/products/:id", (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const query = "UPDATE products SET name = ?, category = ?, description = ? WHERE id = ?";
    conexion.query(query, [id, name, category, description], (error, results) => {
        if (error) {
            res.status(500).json({ error: "Error al actualizar el producto" });
        } else {
            res.json({ message: "Producto actualizado", affectedRows: results.affectedRows });
        }
    });
});

// **DELETE**: Eliminar un producto por ID
app.delete("/products/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM products WHERE id = ?";
    conexion.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: "Error al eliminar el producto" });
        } else {
            res.json({ message: "Producto eliminado", affectedRows: results.affectedRows });
        }
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
