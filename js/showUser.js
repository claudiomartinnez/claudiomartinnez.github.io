// Mostrar usuario
document.addEventListener('DOMContentLoaded', ()=>{
    let usuario = localStorage.getItem("usuario");
    document.getElementById("usuario").innerHTML = usuario;
    
    //Boton de log-out
    document.getElementById("logout").addEventListener("click", function() {
        localStorage.clear()
        location.href= "login.html"
    });
    
});