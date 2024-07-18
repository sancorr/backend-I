const express = require("express");
const app= express();
const PORT= 8080;

//requiero la clase constructora
const ProductManager= require("./managers/productManager.js");

//creo una INSTANCIA DE LA CLASE CONSTRUCTORA- el parametro es el path es donde crea el archivo con los productos
const manager= new ProductManager("./src/data/products.json");

// middlewatre, le decimos al servidor que trabajamos en formato json
app.use(express.json());

//Leer archivo y listar productos
app.get("/products", async (req,res)=>{
    //listar los productos a partir de la instancia de la clase productmanager
    const arrayProductos= await manager.getProducts();
    res.send(arrayProductos);
});

//Listar productos por  ID
app.get("/products/:pid", async (req,res)=>{
    const {pid}=req.params;
    try {
        let productoBuscado = await manager.getProductById(parseInt(pid));
    
        if (productoBuscado) {
            res.send(productoBuscado);
        } else {
            res.send("producto no encontrado");
        }
    } catch (error) {
        res.send("Error al buscar el ID del producto");
    }
})


app.listen(PORT, ()=>{
    console.log(`Escuchando en el http://localhost:${PORT}`);
})