const Product = require("../models/product.model.js");

// Crear y guardar Product
exports.create = (req, res) => {
  // Validar request
  if (!req.body) {
    res.status(400).send({
      message: "Contenido no debe estar vacio"
    });
  }
  const product = new Product({
    price: req.body.price,
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    img: req.body.img,
  });
  Product.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Internal Server Error CREATE"
      });
    else res.send(data);
  });
};

//get All.
exports.findAll = (req, res) => {
  Product.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Internal Server Error FIND_ALL"
      });
    else res.send(data);
  });
};
//get one
exports.findOne= (req, res) => {
  Product.findById(req.params.productId, (err, data)=>{
    if(err){
      if(err.kind==="not_found"){
        res.status(404).send({
          message: 'No se encontro product con el id ' + req.params.productId
        });
      }
      else {
        res.status(500).send({
          message: "Internal Server Error FIND_ONE"
      });
    }
  }
  else res.send(data);
});
};

// updateById
exports.update= (req, res) => {
  //Validar
  if (!req.body) {
    res.status(400).send({
      message: "Contenido no debe estar vacio"
    });
  }
  console.log(req.body);

  //updateById
  Product.updateById(req.params.productId, new Product(req.body), (err, data) =>{
    if(err){
      if(err.kind=="not_found"){
        res.status(404).send({
          message: 'No se pudo actualizar product con el id ' + req.params.productId
        });
      }else{
        res.status(500).send({
          message : "Internal Server Error UPDATE"
        });
      }
    }else res.send(data);
  });
};

//delete
exports.delete = (req, res) => {
  Product.remove(req.params.productId, (err, data) => {
    if(err){
      if(err.kind=="not_found"){
        res.status(404).send({
          message: 'No se pudo eliminar product con el id ' + req.params.productId
        });
      }else{
        res.status(500).send({
          message : "Internal Server Error DELETE"
        });
      }
    }
    else res.send({message: "product id: " + req.params.productId +" eliminado "});
  });
};
