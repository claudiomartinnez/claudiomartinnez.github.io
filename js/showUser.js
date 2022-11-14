// Mostrar usuario
document.addEventListener('DOMContentLoaded', ()=>{
  
    
    let usuario = localStorage.getItem("email");
    document.getElementById("usuario").innerHTML = usuario;

    if (usuario===null){
        location.href= "login.html"
    }
    
    //Boton de log-out
    document.getElementById("logout").addEventListener("click", function() {
        localStorage.removeItem('email')
        location.href= "login.html"
    });
    
});