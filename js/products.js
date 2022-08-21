function showProductsList(array) {
  console.log(array);
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let product = array[i];
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

  document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}

/* 
EJECUCIÓN:

-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en productsArray.
-Por último, se llama a showCategoriesList() pasándole por parámetro productsArray.

*/

document.addEventListener("DOMContentLoaded", () => {
  getJSONData(AUTOS).then(function (resultObj) {
    if (resultObj.status === "ok") {
      let productsArray = resultObj.data.products;
      showProductsList(productsArray);
    }
  });
});
