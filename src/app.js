import express, { Router } from "express";
import exphbs from "express-handlebars";
import { Server } from "socket.io";
import ProductManager from "./managers/productManager.js";
import productsRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import viewsRouter from "./routes/views.routes.js"

const app= express();
const PORT= 8080;

// middlewatre, le decimos al servidor que trabajamos en formato json
app.use(express.json());
app.use(express.static("./src/public"));

// configuracion de express handlebars
app.engine("handlebars", exphbs.engine() );
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//RUTAS products
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);


app.get("/", (req,res)=>{
    res.render("index");
})

const httpServer = app.listen(PORT, ()=>{
    console.log(`Escuchando en el http://localhost:${PORT}`);
});

const manager = new ProductManager("./src/data/products.json");

const io = new Server(httpServer);



io.on("connection", async (socket)=>{
    console.log("cliente conectado");

    socket.emit("products", await manager.getProducts());

    socket.on("addProductForm" , async (data) => { //evento del formulario a partir de la instania del socket
        
        //array de productos
        let productsArr= await manager.getProducts();
        //Guardo productos creados en el ultimo indice del array incrementando el id en 1
        data.id = productsArr.length > 0 ? productsArr[productsArr.length - 1].id + 1 : 1
        
        productsArr.push(data);

        await manager.addProduct(data); // Escribe el archivo


        io.sockets.emit("products", await manager.getProducts()); // Emite a todos los sockets
    })

    

    socket.on("deleteProduct", async (id)=>{
        await manager.deleteProduct(id);
        
        io.sockets.emit("products", await manager.getProducts());
    });

})
