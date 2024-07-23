import fs from 'fs';

class ProductManager {
  static ultId = 0;

  constructor(path) {
    this.path = path;
    this.products = [];
  }

  

  async addProduct({ title, description, price, img, code, stock }) {
    // Validar campos obligatorios
    if (!title || !description || !price || !img || !code || !stock) {
      console.log("Todos los campos son obligatorios");
      return;
    }
  
    // Leer los productos existentes
    const products = await this.leerArchivo();
  
    // Validar que el código sea único
    if (products.some((item) => item.code === code)) {
      console.log("El código debe ser único");
      return;
    }
  
    // Obtener el último ID existente
    const lastProductId = products.length > 0 ? products[products.length - 1].id : 0;
  
    // Crear el nuevo objeto con el ID incrementado
    const nuevoProducto = {
      id: lastProductId + 1,
      title,
      description,
      price,
      img,
      code,
      stock,
    };
  
    // Agregar el nuevo producto al array de productos
    products.push(nuevoProducto);
  
    // Guardar el array actualizado en el archivo
    await this.guardarArchivo(products);
  }
  

  async getProducts() {
    try {
      const arrayProductos = await this.leerArchivo();
      return arrayProductos;
    } catch (error) {
        console.log("Hubo un error al leer el archivo: ", error);
    }
  }

  async getProductById(id) {

    try {
        const arrayProductos= await this.leerArchivo();
        let productoBuscado = arrayProductos.find((item) => item.id === id);

        if (!productoBuscado) {
          console.log("Not found");
          return null
        } else {
          console.log("producto encontrado");
          return productoBuscado
        }
    } catch (error) {
        console.log("Hubo un error al buscar por id: ", error);
    }

  }

  //metodo auxiliar para leer archivo
  async leerArchivo(){
    const respuesta = await fs.promises.readFile(this.path, "utf-8");
    const arrayProductos = JSON.parse(respuesta);
    return arrayProductos

  }

  async guardarArchivo(arrayProductos){
    await fs.promises.writeFile(this.path, JSON.stringify(arrayProductos, null, 2))

  }

  async updateProduct(id, {...updatedProduct}){

    const response= await this.getProducts();

    const index = response.findIndex( product=> product.id == id);

    if (index != -1) {
      response[index] = {id, ...updatedProduct};
      await fs.promises.writeFile(this.path, JSON.stringify(response)); //PROBRAR NULL,2 ACA
      return response[index]
    } else {
      console.log("Error al actualizar el producto");
    }

  }

  async deleteProduct(id){

    const products= await this.getProducts();
    const index= products.findIndex(product=> product.id == id);

    if (index != -1) {
      products.splice(index,1);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
    } else {
      console.log("error al elminar producto");
    }

  }

}


export default ProductManager;