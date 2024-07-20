import { Router } from "express";
import CartManager from "../managers/cartManager.js";


const router = Router();

//creo una INSTANCIA DE LA CLASE CONSTRUCTORA- el parametro es el path es donde crea el archivo con los productos
const cartManager= new CartManager("./src/data/carts.json");


// Ruta para crear un nuevo carrito
router.post('/api/carts', async (req, res) => {
    try {
      const newCart = await cartManager.createCart();
      res.status(201).json(newCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});


// Ruta para listar los productos de un carrito específico
app.get('/api/carts/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
      const products = await cartManager.getCartById(cid);
      res.json(products);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });
  
  // Ruta para agregar un producto a un carrito específico
  app.post('/api/carts/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
      // Verificar si el producto existe en ProductManager
      const product = await productManager.getProductById(parseInt(pid));
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
  
      const cart = await cartManager.addProductToCart(cid, pid);
      res.json(cart);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });


export default router