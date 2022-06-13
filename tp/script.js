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
        document.getElementById(`agregarCarrito${producto.id}`).addEventListener('click',(e)=>{
            e.preventDefault()
            if (carrito.find(prod=>prod.id==producto.id)){
            }else{
                carrito.push(producto)
                localStorage.setItem("productoCarrito",JSON.stringify(carrito))  
                Swal.fire('Elemento Agregado al carrito ') 
            }                  
        })
        document.getElementById(`eliminarProducto${producto.id}`).addEventListener('click',(e)=>{    
            e.preventDefault()        
            productos=borrarProducto(productos,producto.id);            
            actualizarProductos(divProductos,productos) 
            Swal.fire('Elemento eliminado con exito')                
        })    
        document.getElementById(`agregarStock${producto.id}`).addEventListener('click',(e)=>{
            e.preventDefault()
            agregarStock(productos,producto.id);        
            actualizarProductos(divProductos,productos) 
            Swal.fire('El Stock fue actualizado')   
        })
        document.getElementById(`disminuirStock${producto.id}`).addEventListener('click',(e)=>{
            e.preventDefault()            
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
        <img class="card-img-top " src="${productoEnArray.img}" alt="Card image cap">
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
let bCalcCuotas=document.getElementById("cantidadCuotas")
let botonAux=document.getElementById("botonAux")


window.addEventListener('load', ()=>{
    fetch('../productos.json')
    .then(response=>response.json())
    .then(cargaProducto=>{
        cargaProducto.forEach(p=>productos.push(new Producto (p.nombre,p.id,p.valor,p.color,p.stock,p.img)))
        if (localStorage.getItem("producto")){
            const productoNuevo=JSON.parse(localStorage.getItem('producto'))
            productos.push(new Producto (productoNuevo.nombre,productoNuevo.id,productoNuevo.valor,productoNuevo.color,productoNuevo.stock,productoNuevo.img))
            //localStorage.removeItem("producto")
            }
        setTimeout(()=>{
            actualizarProductos(divProductos,productos)
        },1000)
        
    })})



divProductos.addEventListener('focusin',()=>productoAccion())

