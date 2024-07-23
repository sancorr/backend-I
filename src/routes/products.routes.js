import { Router } from "express";
import ProductManager from "../managers/productManager.js";

const router = Router();

//creo una INSTANCIA DE LA CLASE CONSTRUCTORA- el parametro es el path es donde crea el archivo con los productos
const manager= new ProductManager("./src/data/products.json");

//Leer archivo y listar productos
router.get("/", async (req,res)=>{
    //listar los productos a partir de la instancia de la clase productmanager
    try {
        const {limite}= req.query;
        const arrayProductos= await manager.getProducts();
        if (limite) {
            const productosLimite = arrayProductos.slice(0,limite);
            return res.send(productosLimite)
        } else {
            res.send(arrayProductos);
            
        }
    } catch (error) {
        console.log("hubo un error al listar los productos: ", error);
    }
});

//Listar productos por  ID
router.get("/:pid", async (req,res)=>{
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
router.post("/", async (req, res) => {
    const newProduct = req.body;
    try {
      await manager.addProduct(newProduct);
      res.send({ status: "success", message: "Producto agregado con éxito" });
    } catch (error) {
     console.log("Error al agregar producto: ",error);
    }
});

//actualizar productos
router.put("/:pid", async (req,res)=>{
    const {pid}= req.params;
    try {
        const updatedProduct = req.body;
        const response = await manager.updateProduct(pid, updatedProduct);
        res.send(response);
    } catch (error) {
        console.log(`error al actualizar el producto. ID:${pid} `, error);
    }
});

//eliminar productos
router.delete("/:pid", async (req,res)=>{
    const {pid}= req.params;
    try {
        await manager.deleteProduct(pid);
        res.send("producto eliminado con exito");
    } catch (error) {
        console.log(`Error al eliminar producto con id: ${pid}`);
    }

})

export default router
