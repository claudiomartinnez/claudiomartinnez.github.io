let productInfo = undefined;
let relatedProducts = undefined;
let commentsArray = [];

function setProdID(id){
  localStorage.setItem("prodID", id);
  location.href = "product-info.html"
}

function showProductInfo() {
  let productImg = productInfo.images;
  let htmlContentToAppend = `
    <section class="py-5">
      <div class="container px-4 px-lg-5 my-5">
        <div class="row gx-4 gx-lg-5">
          <div class="col-6" style= "min-width: 300px">
            <div class="row shadow-5">
              <div class="col-12 mb-1">
              <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                </div>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img src="${productImg[0]}" class="d-block w-100">
                  </div>
                  <div class="carousel-item">
                    <img src="${productImg[1]}" class="d-block w-100">
                  </div>
                  <div class="carousel-item">
                    <img src="${productImg[2]}" class="d-block w-100">
                  </div>
                  <div class="carousel-item">
                    <img src="${productImg[3]}" class="d-block w-100">
                  </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="small mb-1">${productInfo.category}</div>
            <h1 class="display-5 fw-bolder">${productInfo.name}</h1>
            <div class="fs-7 mb-2">
              <span> ${productInfo.soldCount} Vendidos </span>
            </div>    
            <div class="fs-3 mb-2">
              <span>${productInfo.currency} ${productInfo.cost}</span>
            </div>
            <p class="lead">${productInfo.description}</p>
            <div class = "d-flex">
            <button class="btn btn-outline-dark flex-shrink-0" type="button">
              <i class="fas fa-shopping-cart"></i>
               Añadir al carrito
            </button>
            </div>                
          </div>
        </div>
      </div>
    </section>`;

  document.getElementById("prod-info-container").innerHTML = htmlContentToAppend;


}

function showComments() {
  let htmlContentToAppend = "";
  for (i = 0; i < commentsArray.length; i++) {
    let comment = commentsArray[i];

    htmlContentToAppend += `
    <div class="card mb-3">
      <div class="card-body">
        <div class="d-flex flex-start">
          <div class="w-100">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h6 class="text-primary mb-0">
              ${comment.user}
              <span class="text-dark ms-2">${comment.description}</span>
              </h6>
              <p class="mb-0">${comment.dateTime}</p>
            </div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex flex-row" id="score">
                  ${showStar(comment.score)}
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  document.getElementById("comments").innerHTML = htmlContentToAppend;
}

function showRelatedProducts() {
  let htmlContentToAppend = "";
  for (i = 0; i < relatedProducts.length; i++) {
    let related = relatedProducts[i];
    htmlContentToAppend += `
      <div onclick="setProdID(${related.id})" class="col mx-auto container-fluid cursor-active-related">
        <div class="card h-100">
          <img src="${related.image}" class="card-img-top">
        <div class="card-body text-center">
          <h4 class="card-title ">${related.name}</h4>
        </div>
      </div>
    </div>`
  }
  document.getElementById("related").innerHTML = htmlContentToAppend
}

function showStar(score) {
  let addStar = ``;
  for (let i = 1; i <= 5; i++) {
    if (i <= score) {
      addStar += `<i class="fas fa-star checked"></i>`;
    } else {
      addStar += `<i class="far fa-star "></i>`;
    }
  }
  return addStar;
}

document.addEventListener("DOMContentLoaded", () => {
  let urlInfo = PRODUCT_INFO_URL + localStorage.getItem("prodID") + EXT_TYPE;
  getJSONData(urlInfo).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productInfo = resultObj.data;
      relatedProducts= resultObj.data.relatedProducts;
      showProductInfo();
      showRelatedProducts();
    }
  });

  let urlInfoComments =
    PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("prodID") + EXT_TYPE;
  getJSONData(urlInfoComments).then(function (resultObj) {
    if (resultObj.status === "ok") {
      commentsArray = resultObj.data;
      showComments();
    }
  });
});
