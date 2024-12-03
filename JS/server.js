const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//uso de request con body-Parser -> json
app.use(bodyParser.json());

// request de contenido /algo
app.use(bodyParser.urlencoded({ extended: true }));

//direccion base
app.get("/", (req, res) => {
  res.json({ message: "Connected." });
});

//rutas
require("./app/routes/product.routes.js")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servicio funcionando en http://localhost:3000`);
});
const product = require("./app/products");
const product = new Product({
  HOST : "127.0.0.1", //http://web.host.com:123
  USER: "root",
  PASSWORD: "", //tu password de root va aqui
  DB: "mysql"  
})
