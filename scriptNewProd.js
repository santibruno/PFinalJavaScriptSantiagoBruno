let formularioId=document.querySelector('#formulario')
let comboColor=document.getElementById('comboColor')
let colorSeleccionado=document.getElementById('colorSeleccionado')
fetch('../colores.json')
.then(response=>response.json())
.then(colores=>{colores.forEach((c)=>{
  comboColor.innerHTML+=` <option value="${c.color}">${c.color}</option>`
  comboColor.addEventListener('change',(e)=>{
    e.preventDefault()
    if (comboColor.value==c.color){
      colorSeleccionado.className+=" c"+c.valor
    }
  })
})

})
function refresh() {//Agrega el producto verificando que se completen los datos
  formularioId.addEventListener('submit',(e)=>{
    e.preventDefault()
    let datForm=new FormData(e.target)    
    if ((datForm.get('nombre')&&datForm.get('idValor')&&datForm.get('idColor')&&datForm.get('idStock'))){
      let producto=new Producto(datForm.get('nombre'),(productos.length)+1,datForm.get('idValor'),datForm.get('idColor'),datForm.get('idStock'),"../imagenes/imagenVacia.jpg")    
      localStorage.setItem("productoNuevo",JSON.stringify(producto))
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'El producto fue agregado',
        showConfirmButton: false,
        timer: 1500      
      })
      setTimeout(function(){ 
        window.location.href = "productos.html";
    }, 2000);
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Porfavor Complete todos los campos',
        showConfirmButton: false,
        timer: 1500      
      })
    }

})

}
