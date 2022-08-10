function login (){

    let email = document.getElementById('email').value;
    let contraseña = document.getElementById('password').value;

    if (email==="" || contraseña===""){
        alert("Debe ingresar email y contraseña");
    }else{
        location.href='index.html';
    }


}

document.addEventListener('DOMContentLoaded', ()=>{

    document.getElementById('login').addEventListener('click', ()=>{
        login();
    })
})