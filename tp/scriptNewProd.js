let formularioId=document.querySelector('#formulario')
let botonSubmit=document.getElementById("botonSubmit")

formularioId.addEventListener('submit',(e)=>{
    e.preventDefault()
    let datForm=new FormData(e.target)
    const producto=new Producto(datForm.get('nombre'),(productos.length)+1,datForm.get('idValor'),datForm.get('idColor'),datForm.get('idStock'),null)    
    localStorage.setItem("producto",JSON.stringify(producto))
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'El producto fue agregado',
        showConfirmButton: false,
        timer: 1500      
      })

})
