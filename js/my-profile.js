document.addEventListener("DOMContentLoaded", () =>{
    let usuario = localStorage.getItem("email")
    document.getElementById("email").value = usuario
    document.getElementById('primernombre').value = localStorage.getItem('primernombre')
    document.getElementById('segundonombre').value = localStorage.getItem('segundonombre')
    document.getElementById('primerapellido').value = localStorage.getItem('primerapellido')
    document.getElementById('segundoapellido').value = localStorage.getItem('segundoapellido')
    document.getElementById('telefono').value = localStorage.getItem('telefono')

    document.getElementById("formUsuario").addEventListener("submit", e => {
        e.preventDefault();
        if(!formUsuario.checkValidity()){
            e.stopPropagation();
            
        } else {
            guardarDatos()
        }

        formUsuario.classList.add('was-validated');

    });
})

function guardarDatos(){
    
    let primernombre = document.getElementById('primernombre').value
    let segundonombre = document.getElementById('segundonombre').value
    let primerapellido = document.getElementById('primerapellido').value
    let segundoapellido = document.getElementById('segundoapellido').value
    let email = document.getElementById('email').value
    let telefono = document.getElementById('telefono').value

    localStorage.setItem('primernombre', primernombre)
    localStorage.setItem('segundonombre', segundonombre)
    localStorage.setItem('primerapellido', primerapellido)
    localStorage.setItem('segundoapellido', segundoapellido)
    localStorage.setItem('telefono', telefono)

    primernombre = localStorage.getItem('primernombre')
    
    

    let usuarios = JSON.parse(localStorage.getItem('users'))
    usuarios.push(localStorage.getItem("usuario"))
    
    localStorage.setItem('users', JSON.stringify(usuarios))
    console.log(usuarios)

 }