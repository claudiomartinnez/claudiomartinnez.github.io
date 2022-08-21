document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });


    //Boton de log-out

    document.getElementById("logout").addEventListener("click", function() {
        localStorage.clear()
        location.href= "login.html"
    });

   
    
    
});


// Me lleva al login porque no ingrese ningun "usuario"
if (localStorage.getItem("usuario")===null){
    location.href= "login.html"
}




