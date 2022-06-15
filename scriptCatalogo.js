function actualizarCatalogo(divProductos,productos,aprox){ // actualiza el div de la pagina para ver los productos del catalgo
    //El aprox lo utilizare para luego hacer el aproximado en la busqueda
    if (!aprox){
        if (divProductos){
            divProductos.innerHTML=""
        }
        productos.forEach(productoEnArray=>{divProductos.innerHTML+=    
            `   
        <div class="card text-white bg-primary m-3 col-sm-6 col-md-4 col-lg-2" style="max-width: 20rem;">
            <img class="card-img-top circle" src="${productoEnArray.img}" alt="Card image cap">
            <div class="h3 w-100 h-25 color2 card-header text-center">${productoEnArray.nombre}</div>
            <div class="card-body">
              <p class="card-text">
              Valor: $ ${productoEnArray.valor} <br>
              Color:  ${productoEnArray.color}
              <div class="d-flex d-md-flex d-lg-flex d-sm-flex  flex-lg-column flex-md-column flex-sm-column p-2">
              <button id="agregaraCarrito${productoEnArray.id}" class="p-2 h6 color1 ">Agregar a Carrito</button>         
              </div>
              </p>
              <br>
    
            </div>
        </div>
            `
        })       
   }}
function agregarcarrito(carrito,producto){  //Agrega el producto al carrito
    const productoCarrito={...producto,cantidad:1}
    if (carrito.some((p) => p.id === producto.id)){
        carrito.map((prod => {
            if (prod.id === producto.id) {
                prod.cantidad++;
              return prod;
            }
          }))
    }else{
        carrito.push(productoCarrito)
    }
    return carrito
        
    }
function carritoP(divCarrito,carrito) { //actualizo el div del carrito
        if (divCarrito){
            divCarrito.innerHTML=""
        }
        carrito.forEach(carritoEnArray=>{divCarrito.innerHTML+=    
            `   
        <div class="card text-white bg-primary m-3 col-sm-6 col-md-4 col-lg-2">
            <div class="h5 w-100 color2 text-center">${carritoEnArray.nombre}</div>            
              <p class="card-text">
              <div class="d-flex d-md-flex d-lg-flex d-sm-flex  flex-lg-column flex-md-column flex-sm-column p-2">
              <button id="borrarDeCarrito${carritoEnArray.id}" class="p-2 h6 color1">Eliminar del carrito</button> 
              <p class= "h6 cwhite">Cantidad: ${carritoEnArray.cantidad}</p>        
              </div>
              </p>
              <br>             
        </div>
            `        
           
        })
        divCarrito.innerHTML+=` <br>
        <button id="cerrarCarrito" class="p-2 h6 color1 w-25 h-25  ">cerrar</button>    ` 
        document.getElementById('cerrarCarrito').addEventListener('click',()=>divCarrito.innerHTML="")
        carrito.forEach(produc => {
            document.getElementById(`borrarDeCarrito${produc.id}`).addEventListener('click',()=>{ // Se Asigna la funcion a los botones eliminar
                carrito=carrito.filter(p=>p.id!=produc.id)
                localStorage.setItem("carrito",JSON.stringify(carrito))
                carritoP(divCarrito,carrito)
        })
        
        
      })
        
        
    }
    let carrito=[]
    let divCatalogo=document.getElementById("divCatalogo")
    let divCarrito=document.getElementById("divCarrito")
    let botonCarrito=document.getElementById("carrito")   
    setTimeout(()=>{
        actualizarCatalogo(divCatalogo,productos)
        productos.forEach(producto=> {
            document.getElementById(`agregaraCarrito${producto.id}`).addEventListener('click',()=>{
            carrito=agregarcarrito(carrito,producto)
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer:2000,            
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })                  
              Toast.fire({
                icon: 'success',
                title: 'Producto agregado al carrito'
              })
            localStorage.setItem("carrito",JSON.stringify(carrito))
            
            })})    
    },1000)    
        botonCarrito.addEventListener('click',()=>{ // Verifica que el carrito no este vacio
            if (carrito.length==0){
                Swal.fire({
                    icon: 'error',
                    title: 'Carrito Vacio',
                    showConfirmButton: false,
                    timer: 3000      
                  })
            }else{
                carritoP(divCarrito,carrito)
            }
        })
    