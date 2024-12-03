const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Uso de CORS
app.use(cors());

// Uso de request con body-Parser -> json
app.use(bodyParser.json());

// Request de contenido /algo
app.use(bodyParser.urlencoded({ extended: true }));

// Dirección base
app.get("/", (req, res) => {
  res.json({ message: "Connected." });
});

// Rutas
require("./app/routes/product.routes.js")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servicio funcionando en http://localhost:3000`);
});