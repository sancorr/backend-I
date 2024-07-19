import { Router } from "express";
import ProductManager from "../managers/productManager.js";

const router = Router();

//creo una INSTANCIA DE LA CLASE CONSTRUCTORA- el parametro es el path es donde crea el archivo con los productos
const manager= new ProductManager("./src/data/products.json");

//Leer archivo y listar productos
router.get("/api/products", async (req,res)=>{
    //listar los productos a partir de la instancia de la clase productmanager
    const arrayProductos= await manager.getProducts();
    res.send(arrayProductos);
});

//Listar productos por  ID
router.get("/api/products/:pid", async (req,res)=>{
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
});

// Agregar productos
router.post("/api/products", async (req, res) => {
    const newProduct = req.body;
    try {
      await manager.addProduct(newProduct);
      res.send({ status: "success", message: "Producto agregado con éxito" });
    } catch (error) {
     console.log(error);
    }
});

export default router
