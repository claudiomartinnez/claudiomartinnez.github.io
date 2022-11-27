let cartInfo = [];
let subtotal = undefined;
let costoEnvio = undefined;
let total = undefined;

function showCartInfo(){
    let htmlContentToAppend = "";
    for (let i = 0; i < cartInfo.length; i++) {
        let cart = cartInfo[i];
        htmlContentToAppend += `

        <div class="row mb-4 d-flex justify-content-between align-items-center">
            <div class="col-md-2 col-lg-2 col-xl-2">
                <img
                src="${cart.image}"
                class="img-fluid rounded-3" alt="Cotton T-shirt">
            </div>
            <div class="col-md-3 col-lg-3 col-xl-3">
                <h6 class="text-black mb-0">${cart.name}</h6>
            </div>
            <div class="col-md-3 col-lg-3 col-xl-3 d-flex">
                <button class="btn btn-link px-2"
                onclick="this.parentNode.querySelector('input[type=number]').stepDown();calcularYMostrarCostos()">
                <i class="fas fa-minus"></i>
                </button>

                <input id="cantidad${i}"  name="quantity" value="${cart.count}" type="number" onchange="calcularYMostrarCostos()"
                class="form-control form-control-sm" />

                <button class="btn btn-link px-2"
                onclick="this.parentNode.querySelector('input[type=number]').stepUp();calcularYMostrarCostos()">
                <i class="fas fa-plus"></i>
                </button>
            </div>
            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h6 class="mb-0" id="subtotal${i}">${cart.currency} ${cart.unitCost} </h6>
            </div>
            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                <a href="#!" class="text-muted"><i class="fas fa-times"></i></a>
            </div>
            </div>
    
            <hr class="my-4"></hr> `
        
    }

    document.getElementById("cart-info").innerHTML = htmlContentToAppend;
    
}

function calcularCostos() {
    subtotal = 0;
    for (let i=0; i < cartInfo.length; i++) {
        let cantidad = document.getElementById("cantidad"+i).value
        subtotal += cantidad * cartInfo[i].unitCost    
    }

    let seleccionEnvio = document.getElementById("envio").value
    if (seleccionEnvio == "premium") {
        costoEnvio = subtotal * 0.15;
        total = subtotal + costoEnvio;
    }
    if (seleccionEnvio == "express") {
        costoEnvio = subtotal * 0.07;
        total = subtotal + costoEnvio
    }
    if (seleccionEnvio == "standard") {
        costoEnvio = subtotal * 0.05;
        total = subtotal + costoEnvio
    }

}

function mostrarCostos(){
    
    for (let i=0; i < cartInfo.length; i++) {
        let cantidad = document.getElementById("cantidad"+i).value
        precioProducto = cantidad * cartInfo[i].unitCost
        document.getElementById("subtotal"+i).innerHTML = precioProducto  
    }

    document.getElementById("costoEnvio").innerHTML = `${cartInfo[0].currency} ${costoEnvio}`
    document.getElementById("segundoSubtotal").innerHTML = `${cartInfo[0].currency} ${subtotal}`;
    document.getElementById("total").innerHTML = `${cartInfo[0].currency} ${total}`;

}


function calcularYMostrarCostos(){
    calcularCostos()
    mostrarCostos()
}

function disable(){
    let tarjetaCredito = document.getElementById("tarjetaCredito")
    let transBancaria = document.getElementById("transBancaria")

    if (transBancaria.checked == true ) {
        document.getElementById("numeroTarjeta").setAttribute("disabled","")
        document.getElementById("vencimiento").setAttribute("disabled","")
        document.getElementById("codigoseguridad").setAttribute("disabled","")
        document.getElementById("tarjetaCredito").setAttribute("disabled", "")
    } else {
        document.getElementById("numeroTarjeta").removeAttribute("disabled","")
        document.getElementById("vencimiento").removeAttribute("disabled","")
        document.getElementById("codigoseguridad").removeAttribute("disabled","")
        document.getElementById("tarjetaCredito").removeAttribute("disabled","")
    }

    if (tarjetaCredito.checked == true ) {
        document.getElementById("numeroCuenta").setAttribute("disabled", "")
        document.getElementById("transBancaria").setAttribute("disabled", "")
        
    } else {
        document.getElementById("numeroCuenta").removeAttribute("disabled", "")
        document.getElementById("transBancaria").removeAttribute("disabled", "")
    }

}

function cartValidation() {
    let transBancaria = document.getElementById("transBancaria")
    let tarjetaCredito = document.getElementById("tarjetaCredito")
    let cantidadProductos = document.getElementById("cantidad")
    let resultado = true

    if (!(cantidadProductos.value > 0)) {
        cantidad.classList.add("border")
        cantidad.classList.add("border-danger")
        resultado = false
    }

    else {
        cantidad.classList.remove("border")
        cantidad.classList.remove("border-danger")

    }

    if (!tarjetaCredito.checked && !transBancaria.checked) {
        resultado = false
        document.getElementById("formaPago").classList.replace("btn-dark", "btn-outline-danger");
        document.getElementById("feedback-forma-pago").style.display = "inline";
        
    } else {
        document.getElementById("formaPago").classList.replace("btn-outline-danger", "btn-dark");
        document.getElementById("feedback-forma-pago").style.display = "none";
    }

    return resultado
}

document.addEventListener("DOMContentLoaded", () => {
    cartInfo = JSON.parse(localStorage.getItem('carrito'));
    showCartInfo()
    calcularYMostrarCostos()
          


    document.getElementById("envio").addEventListener("change", () => {
        calcularYMostrarCostos()
    })

    document.getElementById("tarjetaCredito").addEventListener("click", () => {
        disable()
    })

    document.getElementById("transBancaria").addEventListener("click", () => {
        disable()
    })

    document.getElementById("guardarboton").addEventListener("click", () => {
        cartValidation()
    })

    document.getElementById("formCompra").addEventListener("submit", e => {
        e.preventDefault(); // Para evitar refresh del form
        if(!cartValidation() || !formCompra.checkValidity()){
            e.stopPropagation();
        } else {
            setTimeout( () => {
                document.location.reload();
            }, 3000)
            document.getElementById("alerta").style.display = "inline"
        }

        formCompra.classList.add('was-validated');

    });

});

