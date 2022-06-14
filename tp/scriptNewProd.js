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
formularioId.addEventListener('submit',(e)=>{
    e.preventDefault()
    let datForm=new FormData(e.target)
    let producto=new Producto(datForm.get('nombre'),(productos.length)+1,datForm.get('idValor'),datForm.get('idColor'),datForm.get('idStock'),"../imagenes/imagenVacia.jpg")    
    
    localStorage.setItem("productoNuevo",JSON.stringify(producto))

    if ((datForm.get('nombre')&&datForm.get('idValor')&&datForm.get('idColor')&&datForm.get('idStock'))){

    }
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'El producto fue agregado',
        showConfirmButton: false,
        timer: 1500      
      })
})