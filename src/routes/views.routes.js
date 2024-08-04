import { Router } from "express";
const router = Router();
import ProductManager from "../managers/productManager.js";

const manager = new ProductManager("./src/data/products.json");

router.get("/products", async(req,res)=>{
    const products = await manager.getProducts();

    res.render("index", {products})
});

router.get("/realtimeproducts", (req,res)=>{
    res.render("realtimeproducts");
} );




export default router