const sql =require("./db.js")

//constructor
const Product = function(product){
  this.price=product.price;
  this.name= product.name;
  this.category= product.category;
  this.description= product.description;
  this.img= product.img;
};

Product.create=(newProduct, result) => {
  sql.query(`INSERT INTO products SET ?`, newProduct, (err, res) => {
    if(err){
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    console.log("Product creado", { id: res.insertId, ...newProduct});
    result(null, { id: res.insertId, ...newProduct});
  });
};

Product.findById= (productId, result) => {
  sql.query(`SELECT * FROM products WHERE id = ${productId}`, (err, res) => {
    if(err){
        console.log("Error: ", err);
        result(err, null);
        return;
    }
    if(res.length){
      console.log("Product encontrado", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind : "not_found"}, null);
  });
};

Product.getAll = result => {
  sql.query("SELECT * FROM products", (err, res) => {
    if(err){
      console.log("Error en getAll ", err);
      result(null, err);
      return;
    }
    console.log(" Products obtenidos");
    result(null, res)
  });
};

Product.updateById = (id, product, result) => {
  sql.query(`UPDATE products SET price=?, name=?, category=?, description=?, img=? WHERE id=?`, [product.price, product.name, product.category, product.description, product.img, id], (err, res) =>{
    if(err){
      console.log("Error en updateById ", err);
      result(null, err);
      return;
    }
    if(res.affectedRows==0){
      //no encontrado ningun valor
      result({kind: "not_found"}, null);
      return;
    }
    console.log("Updated product: ", {id: id, ...product});
    result(null, {id: id, ...product});
  });
};

Product.remove= (id, result)=> {
  sql.query(`DELETE FROM products WHERE id = ?`, id, (err, res) => {
    if(err){
      console.log("Error en DELETE ", err);
      result(null, err);
      return;
    }
    if(res.affectedRows==0){
      //no encontrado ningun valor
      result({kind: "not_found"}, null);
      return;
    }
    console.log(`DELETED product ${res.affectedRows}`);
    result(null, res);
  });
};

module.exports = Product;
