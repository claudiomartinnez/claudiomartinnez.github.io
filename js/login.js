function login (){

    let email = document.getElementById('email').value;
    let contraseña = document.getElementById('password').value;

    // if (email ==="" && contraseña===""){
    //     document.getElementById('email').classList.add('error');
    //     document.getElementById('error_email').innerHTML = "Ingresar Email";
    //     document.getElementById('password').classList.add('error');
    //     document.getElementById('error_password').innerHTML = "Ingresar Contraseña";
    // }

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
        location.href='index.html';

    }


        
    // } else {
    //     location.href='index.html';
    // }

    // if (contraseña ===""){
    //     document.getElementById('password').classList.add('error');
    //     document.getElementById('error_password').innerHTML = "Ingresar Contraseña";
    // } else {
    //     location.href='index.html';
    // }

 


}

document.addEventListener('DOMContentLoaded', ()=>{

    document.getElementById('login').addEventListener('click', ()=>{
        login();
    })
})