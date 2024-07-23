import express from "express";
import productsRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";

const app= express();
const PORT= 8080;

// middlewatre, le decimos al servidor que trabajamos en formato json
app.use(express.json());

//RUTAS products
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);


app.listen(PORT, ()=>{
    console.log(`Escuchando en el http://localhost:${PORT}`);
})