function agregarStock(productos,id){ //Agrega el stock que se indica 
            let cantidad = parseInt(prompt(`El Stock del producto es ${(productos.find(p=>p.id===id)).stock}\n Cuanto desea agregar?` ))
            while (isNaN(cantidad)){
                cantidad =  parseInt(prompt(`El Stock a agregar debe ser un valor valido (numerico) \n Cuanto desea agregar?` ))
            }
            return productos.map(p=>{
                if(p.id===id){p.stock+=cantidad}})        
}
function borrarProducto(productos,id){ //Borrar producto
      return (productos.filter(producto=>producto.id!=id))
    }
function disminuirStock(productos,id){ // disminuir stock indicado
    let cantidad = parseInt(prompt(`El Stock del producto es ${(productos.find(p=>p.id===id)).stock}\n Cuanto desea disminuir?` ))
    while (isNaN(cantidad)||(productos.find(p=>p.id===id)).stock<cantidad){
        cantidad =  parseInt(prompt(`El Stock a disminuir debe ser un valor valido (numerico) menor a ${(productos.find(p=>p.id===id)).stock}\n Cuanto desea eliminar?` ))
    }
    return productos.map(p=>{
        if(p.id===id){p.stock-=cantidad}})
}
function calcularCuotas(cantidad,valor){ //Calcular Cuotas (no lo implemente)
    const impuesto = 0.05*cantidad + 1
    return (valor*impuesto)/cantidad
}
function productoAccion(){   // Determino las acciones que se realizan con los botones de las cards
        productos.forEach(producto=> {
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


function actualizarProductos(divProductos,productos){ //Actualizo el Div de la pagina con los productos
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
          Color:  ${productoEnArray.color}<br>
          Stock:  ${productoEnArray.stock}
          </p>
          <br>
          <div class="d-flex d-md-flex d-lg-flex d-sm-flex  flex-lg-column flex-md-column flex-sm-column p-2">         
          <button id="eliminarProducto${productoEnArray.id}" class="p-2 h6  color1">Eliminar Producto</button>
          <button id="disminuirStock${productoEnArray.id}" class="p-2 h6 color1">Disminuir Stock </button>
          <button id="agregarStock${productoEnArray.id}" class="p-2 h6 color1">Agregar Stock</button>
          </div>
        </div>
    </div>
        `
    })
}
class Producto { // constructor de producto
    constructor(nombre, id, valor, color,stock,img){
        this.nombre = nombre.toUpperCase();
        this.id = parseInt(id);
        this.valor = parseFloat(valor);
        this.color = color.toUpperCase()  
        this.stock = parseInt(stock)
        this.img= img
    }
    sumarIva(){//No lo implemente
        this.valor=this.valor* iva
    }
}
//------------------------------------------------------------------------------------------------//

let productos=[]
let divProductos=document.getElementById("divProductos1")
let productoCuotas= document.getElementById("inputProdCuotas")
let cantCuotas=document.getElementById("inputCantCuotas")
let bCalcCuotas=document.getElementById("cantidadCuotas")
let botonAux=document.getElementById("botonAux")


window.addEventListener('load', ()=>{ //descarga el archivo.json cuando se actualiza la pagina y se cargan los productos en un array (tambien el del local storage)
    fetch('../productos.json')
    .then(response=>response.json())
    .then(cargaProducto=>{
        cargaProducto.forEach(p=>productos.push(new Producto (p.nombre,p.id,p.valor,p.color,p.stock,p.img)))
        if (localStorage.getItem("productoNuevo")){
            const productoNuevo=JSON.parse(localStorage.getItem('productoNuevo'))
            productos.push(new Producto (productoNuevo.nombre,productoNuevo.id,productoNuevo.valor,productoNuevo.color,productoNuevo.stock,productoNuevo.img))
            }
        setTimeout(()=>{
            actualizarProductos(divProductos,productos)
        },1000)        
    })})

divProductos.addEventListener('focusin',()=>productoAccion())