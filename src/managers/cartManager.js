import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

class CartManager {
    constructor(path) {
      this.path = path;
    }

    //Metodo para crear el carrito con su id unico y un array contenedor de productos.
    async createCart(){
        const carts= await this.readFile();

        //Mientras exista un id igual a otro en el carrito, crea otro id hasta que sean diferentes y lo asigna a newId;
        let newId;
        do {
            newId=uuidv4();
        } while (carts.some(cart=> cart.id == newId));

        //Creo un nuevo carrito con su id unico y un array vacio donde se guardaran los productos.
        const newCart = {
            id: newId,
            products: []
        }
        
        //push del nuevo carrito a los carritos 
        carts.push(newCart);
        await this.writeFile(carts);
        return newCart;
    }


    //Metodo para listar los productos de un carrito especifico por su ID;

    async getCartById(cid){
        const carts= await this.readFile();
        const cart = carts.find( cart = cart.id == cid);
        
        if (cart) {
            return cart.products
        } else {
            throw new Error("carrito no encontrado");
        }
    }

    //Metodo para agregar un producto a un carrito especifico;

    async addProductToCart(cid,pid){
        //lee el archivo con array de carritos y lo guarda en carts
        const carts = await this.readFile();
        //busca el carrito por su id, comparandolo con los demas carritos en el array
        const cartIndex = carts.findIndex(cart => cart.id == cid);

        //si no lo encuentra, arroja un error
        if(cartIndex == -1){
            throw new Error("Carrito no encontrado");
        }

        //si lo encuentra, guarda su indice dentro del array en carts
        const cart = carts[cartIndex];

        //busca el indice del producto dentro del array de productos, que esta dentro del array de carritos
        const productIndex = cart.products.findIndex(p => p.product == pid);

        //si lo encuentra ya presente en el array, incrementa su cantidad en 1
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += 1
        } else {
            //si no estaba previamente en el array de productos, lo agrega con id y cantidad 1
            cart.products.push({product:pid, quantity:1});
        }

        //actualiza el carrito en el array de carritos
        carts[cartIndex] = cart;
        //escribe el archivo de carrito actualizado
        await this.writeFile(carts);
        //devuelve el carrito actualizado
        return cart;
    }


    //metodo auxiliar para leer archivos;
    async readFile(){
        try {
            const data = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            console.log("error al leer el archivo, por las dudas fijate la ruta: " , error);
        }
    }

    //metodo auxiliar para escribir el archivo
    async writeFile(data){
        await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));

    }


}

export default CartManager

