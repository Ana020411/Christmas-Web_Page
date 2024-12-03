let mysql = require("mysql");

let conexion = mysql.createConnection({
    host: "localhost",
    database: "mysql",
    user: "root",
    password: ""
});
conexion.connect(function(error) {
    if (error) {
        console.error("Error connecting to the database:", error);
        return;
    }
    
    console.log("Conexion exitosa");

    const productQuery = "SELECT * FROM products";
    conexion.query(productQuery, function(error, lista) {
        if (error) {
            console.error("Error executing query:", error);
            conexion.end();
            return;
        }

        console.log("Products:", lista);

        conexion.end((err) => {
            if (err) {
                console.error("Error closing connection:", err);
            }
            console.log("Connection closed");
        });
    });
});

