let carritoCompras = [];

const productsContainer = document.getElementById('contenedor-productos');
const carritoContainer = document.getElementById('productos-carrito');

const precioTotal = document.getElementById('precioTotal');



mostrarProductos()


function mostrarProductos(){
    
    listaProductos.forEach(el => {

        let div = document.createElement('div')
        div.className = 'cards-container'

        div.innerHTML = `<div class="cards">
                            <div class="card-image">
                                <img src="${el.img}" width="100px">
                            </div>
                            <div class="card-values">
                                <span class="card-title">${el.nombre}</span>
                                <p class="precio"> $${el.precio}</p>
                                <button id="boton${el.id}" class="boton">Agregar al carrito</button>
                            </div>
                        </div> `

                    
        productsContainer.appendChild(div)

        let btnAgregar = document.getElementById(`boton${el.id}`)
        btnAgregar.addEventListener("click", () => {
            agregarCarrito(el.id);
        })
        
    })
}


function agregarCarrito (id){
    let repetido = carritoCompras.find(elemento => elemento.id == id)
    
    if (repetido){
        repetido.cantidad = repetido.cantidad + 1;
        document.getElementById(`cantidad${repetido.id}`).innerHTML = `<p id="cantidad${repetido.id}">Cant.: ${repetido.cantidad}</p>`
        modificarCarrito()
    }else {
        let agregarProducto = listaProductos.find(el => el.id === id)
        agregarProducto.cantidad = 1
        carritoCompras.push(agregarProducto)
        mostrarCarrito(agregarProducto)
        modificarCarrito() 
    }
   
}


function mostrarCarrito (agregarProducto){

    let div = document.createElement('div')
        div.className = 'productoscarrito'
        div.innerHTML = `   <p>${agregarProducto.nombre}</p>
                            <p>$${agregarProducto.precio}</p>
                            <p id="cantidad${agregarProducto.id}" class="cardcarrito">Cant.: ${agregarProducto.cantidad}</p>
                            <button id="eliminar${agregarProducto.id}"class="btnCant">-</button>`

    carritoContainer.appendChild(div)

    let btnELiminar = document.getElementById(`eliminar${agregarProducto.id}`)
    btnELiminar.addEventListener("click", ()=> {
        if (agregarProducto.cantidad == 1) {
            btnELiminar.parentElement.remove()
            carritoCompras = carritoCompras.filter(el => el.id !== agregarProducto.id)
            modificarCarrito()
        } else {
            agregarProducto.cantidad = agregarProducto.cantidad - 1;
            document.getElementById(`cantidad${agregarProducto.id}`).innerHTML = `<p id="cantidad${agregarProducto.id}">Cant.: ${agregarProducto.cantidad}</p>`
            modificarCarrito()
        }
    })
    
    localStorage.setItem("Carrito", JSON.stringify(carritoCompras)) 
    
    
}

function modificarCarrito(){

    precioTotal.innerText = carritoCompras.reduce((acc, el)=> acc + (el.precio * el.cantidad) , 0);
      
    
}

function recuperar() {
    
    let recuperarCarrito = JSON.parse(localStorage.getItem("Carrito")) || []
    console.log(recuperarCarrito);
    for (const elemento of recuperarCarrito) {
        mostrarCarrito(elemento)
        carritoCompras.push(elemento)
        modificarCarrito()
    }
}

recuperar()



