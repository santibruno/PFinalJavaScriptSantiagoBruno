let submitUser=document.getElementById("submitUser")
let submitAdmin=document.getElementById("submitAdmin")

submitUser.addEventListener('submit',(e)=>{//Ingresar como usuario
    e.preventDefault()
    let datForm=new FormData(e.target)
    if (datForm.get('usuario')&&isNaN(datForm.get('usuario'))){
        Swal.fire({
            icon: 'success',
            title: 'Bienvenido/a '+ datForm.get('usuario'),
            showConfirmButton: false,
            timer: 3000      
          })
          setTimeout(function(){ 
            window.location.href = "catalogo.html";
      }, 3000);
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Ingrese su nombre',
            showConfirmButton: false,
            timer: 2000      
          })
        submitUser.reset();
    }
})
submitAdmin.addEventListener('submit',(event)=>{//Ingresar como Administrador
    event.preventDefault()
    let datForm=new FormData(event.target)
    if (datForm.get('username')&&datForm.get('password')){
        fetch('../administradores.json')
        .then(response=>response.json())
        .then(admin=>{
            admin.forEach(e => {
                if ((datForm.get('username')==e.username)&&(datForm.get('password')==e.password)){
                    Swal.fire({
                        icon: 'success',
                        title: 'Bienvenido/a '+ datForm.get('username'),
                        showConfirmButton: false,
                        timer: 3000      
                      })
                      setTimeout(function(){ 
                        window.location.href = "productos.html";
                  }, 3000);
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Usuario no encontrado',
                        showConfirmButton: false,
                        timer: 2000      
                      })
                    submitAdmin.reset();
                }
        })
        })        
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Ingrese su nombre',
            showConfirmButton: false,
            timer: 2000      
          })
        submitAdmin.reset();
    }
})