function login (){

    let email = document.getElementById('email').value;
    let contraseña = document.getElementById('password').value;

    if (contraseña===""){
        document.getElementById('password').classList.add('error');
        document.getElementById('error_password').innerHTML = "Ingresar Contraseña";
    } else{
        document.getElementById('password').classList.remove('error');
        document.getElementById('error_password').innerHTML = "";
    }

    if (email===""){
        document.getElementById('email').classList.add('error');
        document.getElementById('error_email').innerHTML = "Ingresar Email";

    } else{
        document.getElementById('email').classList.remove('error');
        document.getElementById('error_email').innerHTML = "";

    }

    if (email!=="" && contraseña!==""){
        Swal.fire({
            title: 'Bienvenido/a',
            confirmButtonColor: '#28b9a6',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
                localStorage.setItem("email", email) ;
                let usuarios = JSON.parse(localStorage.getItem('users'))
                let usuarioExistente = usuarios.find((usuario) => usuario[0]==email)
                if (!usuarioExistente) {
                    let usuarioNuevo = [email]
                    usuarios.push(usuarioNuevo)
                    localStorage.setItem('users', JSON.stringify(usuarios))
                    
                }
             
                location.href='index.html';
            }
          })
        

    }


}

document.addEventListener('DOMContentLoaded', ()=>{

    document.getElementById('login').addEventListener('click', ()=>{
        login();
    })
})

