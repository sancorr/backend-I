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

const addForm = document.getElementById("addForm")

addForm.addEventListener('submit', (event) => {
    event.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const code = document.getElementById('code').value;
        const price = document.getElementById('price').value;
        const stock = document.getElementById('stock').value;
    
        if (event){
          
            socket.emit("addProductForm", {title,
                description,
                price,
                code,
                stock,
                img: "sin imagen"
                });
            console.log("enviado al socket")
        }
});