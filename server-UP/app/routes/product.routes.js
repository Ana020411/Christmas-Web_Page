module.exports = app => {
  const products = require("../controllers/product.controller.js");

  //Crear
  app.post("/products", products.create);

  //get All
  app.get("/products", products.findAll);

  //get by id
  app.get("/products/:productId", products.findOne);

  // update
  app.put("/products/:productId", products.update);

  // delete
  app.delete("/products/:productId", products.delete);

  // borrado total
  //app.delete("/products", products.deleteAll);
};
