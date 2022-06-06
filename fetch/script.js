function llenarHtml(div,user){
    console.log(user)
    div.innerHTML="";
    (user!=null) ? div.innerHTML=`<div class= "text-center border border-danger">
    <br>
    <h2 class= "h4" > Nombre: </h2> <p>${user[0].nombre}</p> <br>
    <h3 class= "h4" > Edad: </h3> <p>${user[0].edad}</p> <br>
    <h4 class= "h4" > Carrera: </h4> <p>${user[0].carrera}</p>
    </div>`:div.innerHTML=`<div class= "text-center border border-danger">
    <br>
    <h2 class= "h4" > Usuario No encontrado</h2> 
    </div>`
}
let usuariosBosteros=[]
let inputUser=document.getElementById("inputUser")
let botonBuscar=document.getElementById("botonBuscar")
let divUser=document.getElementById("divUser")
botonBuscar.addEventListener('click',()=>{
    fetch('/personas.json')
    .then(response => response.json())
    .then(personas=>{        
        (personas.find(persona=>persona.nombre.toUpperCase()==(inputUser.value).toUpperCase()))?llenarHtml(divUser,personas.filter(persona=>persona.nombre.toUpperCase()==(inputUser.value).toUpperCase())):llenarHtml(divUser)
        let personaBuscada=personas.find(persona=>persona.nombre.toUpperCase()==(inputUser.value).toUpperCase())
        console.log(personaBuscada??"usuario No encontrado")
    })
})

