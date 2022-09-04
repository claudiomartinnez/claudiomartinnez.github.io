let minCost = undefined;
let maxCost = undefined;
let currentProductsArray = []

function showProductsList() {
  let htmlContentToAppend = "";

  for (let i = 0; i < currentProductsArray.length; i++) {
    let product = currentProductsArray[i];
    if (((minCost == undefined) || (minCost != undefined && product.cost >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && product.cost <= maxCost))){
    
      htmlContentToAppend += `
          <div class="list-group-item list-group-item-action">
              <div class="row">
                  <div class="col-3">
                      <img src="${product.image}" alt="product image" class="img-thumbnail">
                  </div>
                  <div class="col">
                      <div class="d-flex w-100 justify-content-between">
                          <div class="mb-1">
                          <h4>${product.name} - ${product.currency} ${product.cost} </h4> 
                          <p> ${product.description} </p> 
                          </div>
                          <small class="text-muted"> ${product.soldCount} artículos</small> 
                      </div>

                  </div>
              </div>
          </div>
          `;
      }
  }

  document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}


document.addEventListener("DOMContentLoaded", () => {
  
  let url = PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE;
  getJSONData(url).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentProductsArray = resultObj.data.products;
      showProductsList();
    }
  });

  document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterCostMin").value = "";
    document.getElementById("rangeFilterCostMax").value = "";

    minCost = undefined;
    maxCost = undefined;

    showProductsList();

  });
  document.getElementById("rangeFilterCost").addEventListener("click", function(){

    minCost = document.getElementById("rangeFilterCostMin").value;
    maxCost = document.getElementById("rangeFilterCostMax").value;

    if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
      minCost = parseInt(minCost);
    }
    else{
      minCost = undefined;
    }

    if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
      maxCost = parseInt(maxCost);
    }
    else{
      maxCost = undefined;
    }

    showProductsList();
  
  });

  document.getElementById("sortAsc").addEventListener("click", function () {
    currentProductsArray.sort(function (a, b){
      return b.cost - a.cost
    });

    showProductsList();
    
  });

  document.getElementById("sortDesc").addEventListener("click", function() {
    currentProductsArray.sort(function (a, b){
      return a.cost - b.cost
    });

    showProductsList();

  });

  document.getElementById("sortSales").addEventListener("click", function() {
    currentProductsArray.sort(function (a, b){
      return a.soldCount - b.soldCount
    });

    showProductsList();
    
  });


});


document.addEventListener("DOMContentLoaded", () =>{
  let nombre;
  let catID = localStorage.getItem("catID");
  let catIDAutos = catID === "101";
  if (catIDAutos){
    nombre = "Autos"
  }

  let catIDJuguetes = catID === "102";
  if (catIDJuguetes){
    nombre = "Juguetes"
  }

  let catIDMuebles = catID === "103";
  if (catIDMuebles){
    nombre = "Muebles"
  }

  document.getElementById("tituloProducto").innerHTML = nombre
  document.getElementById("tituloProducto2").innerHTML = nombre

})




