//console.log("funciona");

const socket = io();

socket.on("products",(data)=>{
        
    renderProducts(data);
});

const renderProducts = (products)=>{
    const productsContainer = document.getElementById("productsContainer");

    productsContainer.innerHTML= "";

    products.forEach(el => {
        const card= document.createElement("div");
        card.innerHTML = `<p>${el.id}</p>
                          <p>${el.title}</p>
                          <p>${el.price}</p>
                          <button>eliminar</button>  `
        productsContainer.appendChild(card);


        card.querySelector("button").addEventListener("click",()=>{
            deleteProduct(el.id);
        })
        
    });

};

const deleteProduct= (id)=>{
    socket.emit("deleteProduct", id);
};