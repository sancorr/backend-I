const express = require("express");
const app= express();
const PORT= 8080;

const ProductManager= require("./managers/productManager.js");

const manager= new ProductManager("./data/products.json");

// middlewatre, le decimos al servidor que trabajamos en formato json
app.use(express.json());

app.get("/products", async (req,res)=>{
    //listar los productos a partir de la instancia de la clase productmanager
    const arrayProductos= await manager.getProducts();
    res.send(arrayProductos);
});

app.listen(PORT, ()=>{
    console.log(`Escuchando en el http://localhost:${PORT}`);
})