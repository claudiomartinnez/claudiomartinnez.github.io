// Mostrar usuario
document.addEventListener('DOMContentLoaded', ()=>{
    if (localStorage.getItem('users')==null) {
        localStorage.setItem('users', '[]')
        
    }
    
    let usuario = localStorage.getItem("email");
    document.getElementById("usuario").innerHTML = usuario;

    if (usuario===null){
        location.href= "login.html"
    }
    
    //Boton de log-out
    document.getElementById("logout").addEventListener("click", function() {
        localStorage.clear()
        location.href= "login.html"
    });
    
});