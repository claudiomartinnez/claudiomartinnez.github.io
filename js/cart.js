let cartInfo = [];
let subtotal = undefined;

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
                onclick="this.parentNode.querySelector('input[type=number]').stepDown();updateValue()">
                <i class="fas fa-minus"></i>
                </button>

                <input id="cantidad" min="1" name="quantity" value="${cart.count}" type="number" onchange="updateValue()"
                class="form-control form-control-sm" />

                <button class="btn btn-link px-2"
                onclick="this.parentNode.querySelector('input[type=number]').stepUp();updateValue()">
                <i class="fas fa-plus"></i>
                </button>
            </div>
            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h6 class="mb-0" id="subtotal">${cart.currency} ${cart.unitCost} </h6>
            </div>
            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                <a href="#!" class="text-muted"><i class="fas fa-times"></i></a>
            </div>
            </div>
    
            <hr class="my-4"></hr> `
        
    }

    document.getElementById("cart-info").innerHTML = htmlContentToAppend;
    document.getElementById("total").innerHTML = `${cartInfo[0].currency} ${subtotal}`;
}


function updateValue(){
    let cantidad = document.getElementById("cantidad").value;
    subtotal = cantidad * cartInfo[0].unitCost;
    document.getElementById("subtotal").innerHTML = `${cartInfo[0].currency} ${subtotal}`;
    document.getElementById("total").innerHTML = `${cartInfo[0].currency} ${subtotal}`;

}

document.addEventListener("DOMContentLoaded", () => {
    let cartURL = CART_INFO_URL + "25801" + EXT_TYPE;
    getJSONData(cartURL).then(function (resultObj) {
        if (resultObj.status === "ok") {
          cartInfo = resultObj.data.articles;
          subtotal = cartInfo[0].count * cartInfo[0].unitCost;
          showCartInfo()
          
        }
})
});

