document.addEventListener("DOMContentLoaded", () =>{
    let usuarios = JSON.parse(localStorage.getItem('users'))
    let usu1 = usuarios.find((usuario) => usuario[0]==localStorage.getItem('email'))
    document.getElementById("email").value = usu1[0]
    if (usu1[1]!=undefined) {
        document.getElementById('primernombre').value = usu1[1]
        document.getElementById('segundonombre').value = usu1[2]
        document.getElementById('primerapellido').value = usu1[3]
        document.getElementById('segundoapellido').value = usu1[4]
        document.getElementById('telefono').value = usu1[5]
        
    }
    

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
    let telefono = document.getElementById('telefono').value

    let usuarios = JSON.parse(localStorage.getItem('users'))
    let usu1 = usuarios.find((usuario) => usuario[0]==localStorage.getItem('email'))
    usu1[1] = primernombre
    usu1[2] = segundonombre
    usu1[3] = primerapellido
    usu1[4] = segundoapellido
    usu1[5] = telefono
    localStorage.setItem('users', JSON.stringify(usuarios))
    console.log(usuarios)

 }