import fs from 'fs';

class CartManager {
    constructor(path) {
      this.path = path;
      this.carts = [];
      this.ultId = 0;

      this.readCarts();
    }

    //leer el archivo y cargar la informacion previa en el array de carts
    async readCarts(){
        try {
            const data = await fs.promises.readFile(this.path, "utf-8");
            this.carts = JSON.parse(data);

            if (this.carts.length > 0) {
                this.ultId = Math.max(...this.carts.map(cart=> cart.id));
            }
        } catch (error) {
            console.log("error al cargar el carrito desde el archivo", error);
            await this.saveCarts();
        }
    }

    async saveCarts(){
        await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    }


    //Metodo para crear el carrito con su id unico y un array contenedor de productos.
    async createCart(){
        const newCart = {
            id: ++this.ultId,
            products: []
        }
        this.carts.push(newCart);
        await this.saveCarts();
        return newCart;
    }


    //Metodo para listar los productos de un carrito especifico por su ID;

    async getCartById(cid){
        try {
            const cart = this.carts.find(c => c.id == cid);
            if (!cart) {
                throw new Error("No existe un carrito con ese id");
            }
            return cart
        } catch (error) {
            console.log("error al obtener el carrito por id", error);
        }
    }

    //Metodo para agregar un producto a un carrito especifico;

    async addProductsToCart(cid,pid,quantity = 1){
        const cart = await this.getCartById(cid);
        const productInCart = cart.products.find(p => p.product == pid);

        if(productInCart){
            productInCart.quantity += quantity;
        }else{
            cart.products.push({product: pid, quantity});
        }

        await this.saveCarts();
        return cart;
    }


}

export default CartManager

