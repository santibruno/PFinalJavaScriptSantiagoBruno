function agregarProducto(productos){
    let nombre = prompt("Ingrese un nombre") 
    while (!isNaN(nombre)){
        nombre=prompt("Ingrese un nombre valido")
    }
    const id = productos.length
    let valor = parseInt(prompt("Ingrese un valor $$$"))
    while (isNaN(valor)){
        valor=parseInt(prompt("Ingrese un valor $$$ valido"))
    }
    let color = prompt("Ingrese un color")
    while (!isNaN(color)){
        color = prompt("Ingrese un color valido")
    }
    let stock = parseInt(prompt("Ingrese el stock de su producto"))
    while (isNaN(stock)){
        stock =  parseInt(prompt("Ingrese el stock de su producto valido"))
    }
    productos.push (new Producto(nombre,id,valor,color,stock))
    divProductos.innerHTML+=`<p>Nombre: ${nombre}</p>`
    return alert (`El Producto ${nombre} fue agregado con exito con un valor de $ ${valor}`)
}
function agregarStock(productos,id){
            let cantidad = parseInt(prompt(`El Stock del producto es ${(productos.find(p=>p.id===id)).stock}\n Cuanto desea agregar?` ))
            while (isNaN(cantidad)){
                cantidad =  parseInt(prompt(`El Stock a agregar debe ser un valor valido (numerico) \n Cuanto desea agregar?` ))
            }
            return productos.map(p=>{
                if(p.id===id){p.stock+=cantidad}})
        
}
function borrarProducto(productos,id){   
      return (productos.filter(producto=>producto.id!=id))
    }
    
     
function disminuirStock(productos,id){
    let cantidad = parseInt(prompt(`El Stock del producto es ${(productos.find(p=>p.id===id)).stock}\n Cuanto desea disminuir?` ))
    while (isNaN(cantidad)||(productos.find(p=>p.id===id)).stock<cantidad){
        cantidad =  parseInt(prompt(`El Stock a disminuir debe ser un valor valido (numerico) menor a ${(productos.find(p=>p.id===id)).stock}\n Cuanto desea eliminar?` ))
    }
    return productos.map(p=>{
        if(p.id===id){p.stock-=cantidad}})
}
function calcularCuotas(cantidad,valor){
    const impuesto = 0.05*cantidad + 1
    return (valor*impuesto)/cantidad
}
function productoAccion(){
    
    productos.forEach(producto=> {
        document.getElementById(`agregarCarrito${producto.id}`).addEventListener('click',()=>{
            console.log(producto.id)
            carrito.push(producto)
            localStorage.setItem("productoCarrito",JSON.stringify(carrito))     
               
        })
        document.getElementById(`eliminarProducto${producto.id}`).addEventListener('click',()=>{            
                productos=borrarProducto(productos,producto.id);            
                actualizarProductos(divProductos,productos) 
                Swal.fire('Elemento eliminado con exito')
                
    })
    
        document.getElementById(`agregarStock${producto.id}`).addEventListener('click',()=>{
            agregarStock(productos,producto.id);        
            actualizarProductos(divProductos,productos) 
            Swal.fire('El Stock fue actualizado')   
    })
    document.getElementById(`disminuirStock${producto.id}`).addEventListener('click',()=>{
        disminuirStock(productos,producto.id);        
        actualizarProductos(divProductos,productos)        
        Swal.fire('El Stock fue actualizado')    
})
        
        
    })
}

function actualizarProductos(divProductos,productos){
    if (divProductos){
        divProductos.innerHTML=""
    }
    productos.forEach(productoEnArray=>{divProductos.innerHTML+=    
        `   
    <div class="card text-white bg-primary m-3 col-sm-8 col-md-4 col-lg-2" style="max-width: 20rem;">
        <svg xmlns="http://www.w3.org/2000/svg" class="d-block user-select-none" width="100%" height="200" aria-label="Placeholder: Image cap" focusable="false" role="img" preserveAspectRatio="xMidYMid slice" viewBox="0 0 318 180" style="font-size:1.125rem;text-anchor:middle">
            <rect width="100%" height="100%" fill="#868e96"></rect>
            <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text>
        </svg>
        <div class="h3 w-100 h-25 color2 card-header text-center">${productoEnArray.nombre}</div>
        <div class="card-body">
          <p class="card-text">
          Valor: $ ${productoEnArray.valor} <br>
          Color: $ ${productoEnArray.color}<br>
          Stock:  ${productoEnArray.stock}
          </p>
          <br>
          <div class="d-flex d-md-flex d-lg-flex flex-lg-column flex-md-column d-sm-inline-flex p-2">
          <button id="agregarCarrito${productoEnArray.id}" class="p-2 h6 color1 ">Agregar a Carrito</button>
          <button id="eliminarProducto${productoEnArray.id}" class="p-2 h6  color1">Eliminar Producto</button>
          <button id="disminuirStock${productoEnArray.id}" class="p-2 h6 color1">Disminuir Stock </button>
          <button id="agregarStock${productoEnArray.id}" class="p-2 h6 color1">Agregar Stock</button>
          </div>
        </div>
    </div>
    

        `
    })/*
    <div class="d-flex card m-5 p-1 col-sm-8 col-md-4 col-lg-2 " >
        <div class="card-body cards1 rounded">
        <h2 class="h3 w-100 h-25 color2 tex-center">${productoEnArray.nombre}</h2>
        <p class="card-text ">
        Valor: $ ${productoEnArray.valor} <br>
        Color: $ ${productoEnArray.color}<br>
        Stock:  ${productoEnArray.stock}
        <br>
        <div class="d-flex d-md-flex d-lg-flex flex-lg-column flex-md-column d-sm-inline-flex p-2">
        <button id="agregarCarrito${productoEnArray.id}" class="p-2 h6 color1 ">Agregar a Carrito</button>
        <button id="eliminarProducto${productoEnArray.id}" class="p-2 h6  color1">Eliminar Producto</button>
        <button id="disminuirStock${productoEnArray.id}" class="p-2 h6 color1">Disminuir Stock </button>
        <button id="agregarStock${productoEnArray.id}" class="p-2 h6 color1">Agregar Stock</button>
        </div>
        
        
        </div>   </div>    */
}
class Producto {
    constructor(nombre, id, valor, color,stock,img){
        this.nombre = nombre.toUpperCase();
        this.id = parseInt(id);
        this.valor = parseFloat(valor);
        this.color = color.toUpperCase()  
        this.stock = parseInt(stock)
        this.img= img
    }
    sumarIva(){
        this.valor=this.valor* iva
    }
}

//------------------------------------------------------------------------------------------------
let productos=[]
let carrito=[]

let divProductos=document.getElementById("divProductos1")
let productoCuotas= document.getElementById("inputProdCuotas")
let cantCuotas=document.getElementById("inputCantCuotas")
let formularioId=document.querySelector('#formulario')
let bCalcCuotas=document.getElementById("cantidadCuotas")
let botonAux=document.getElementById("botonAux")

window.addEventListener('load', ()=>{
    fetch('../productos.json')
    .then(response=>response.json())
    .then(cargaProducto=>{
        cargaProducto.forEach(p=>productos.push(new Producto (p.nombre,p.id,p.valor,p.color,p.stock,p.img)))
        setTimeout(()=>{
            actualizarProductos(divProductos,productos)
        },1000)
    })})

formularioId.addEventListener('submit',(e)=>{
    e.preventDefault()
    let datForm=new FormData(e.target)
    const producto=new Producto(datForm.get('nombre'),(productos.length)+2,datForm.get('idValor'),datForm.get('idColor'),datForm.get('idStock'))
    productos.push(producto)
    actualizarProductos(divProductos,productos)
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'El producto fue agregado',
        showConfirmButton: false,
        timer: 1500
      })
})

/*bCalcCuotas.addEventListener('click',()=> 
{
    if (!productos.find(producto=>producto.nombre===productoCuotas.value.toUpperCase())){
        alert("Ingrese un producto valido")
    }else if(cantCuotas.value>12 || cantCuotas.value<=0|| cantCuotas.value==null ){
        alert("Ingrese un valor de cuotas valido")
    }else{
        alert(`Las ${cantCuotas.value} cuotas seran de ` + calcularCuotas(cantCuotas.value,(productos.filter(producto=>producto.nombre===productoCuotas.value.toUpperCase()))[0].valor))
    }    
})
*/
divProductos.addEventListener('focusin',()=>productoAccion())

