import { Router } from "express";
import CartManager from "../managers/cartManager.js";


const router = Router();

//creo una INSTANCIA DE LA CLASE CONSTRUCTORA- el parametro es el path es donde crea el archivo con los productos
const cartManager= new CartManager("./src/data/carts.json");


// Ruta para crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
      const newCart = await cartManager.createCart();
      res.status(201).json(newCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});


// Ruta para listar los productos de un carrito específico
router.get('/:cid', async (req, res) => {
    let cartId = parseInt(req.params.cid); 
    try {
      const cart = await cartManager.getCartById(cartId);
      res.json(cart.products);
    } catch (error) {
      res.status(500).send("Error al obtener el carrito por id");
    }
});
  
// Ruta para agregar un producto a un carrito específico
router.post('/:cid/product/:pid', async (req, res) => {
  let cartId = parseInt(req.params.cid);
  let productId = req.params.pid;
  let quantity = req.body.quantity || 1 ;

  try {
    const updateCart = await cartManager.addProductsToCart(cartId, productId, quantity);
    res.json(updateCart.products);
  } catch (error) {
    res.status(500).send("Error al agregar un producto al carrito");
  }
      
});


export default router