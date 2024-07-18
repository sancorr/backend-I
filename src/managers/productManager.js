const fs = require("fs");

class ProductManager {
  static ultId = 0;

  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async addProduct({title, description, price, img, code, stock}) {
    //Realizamos las validaciones y si las pasa creamos el objeto con el id autoincrementable

    if (!title || !description || !price || !img || !code || !stock) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    //Validamos que el codigo sea unico.

    if (this.products.some((item) => item.code === code)) {
      console.log("El codigo debe ser unico o todos moriremos");
      return;
    }

    //Creamos el nuevo objeto:
    const nuevoProducto = {
      id: ++ProductManager.ultId,
      title,
      description,
      price,
      img,
      code,
      stock,
    };

    //Lo agrego al array:
    this.products.push(nuevoProducto);

    //Lo guardo en un archivo:
    await this.guardarArchivo(this.products);
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

}


module.exports = ProductManager;