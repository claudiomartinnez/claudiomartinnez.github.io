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
                <div class="lightbox">
                  <img
                    id= "mainImg"
                    src="${productImg[0]}"
                    alt="Gallery main image 1"
                    class="active w-100 border border-dark rounded"
                  />
                </div>
              </div>
              <div class="col-3 mt-1">
                <img
                  id= "img0"
                  src="${productImg[0]}"
                  alt="Gallery image 1"
                  class="active w-100 border border-dark rounded small-img"
                />
              </div>
              <div class="col-3 mt-1">
                <img
                  id= "img1"
                  src="${productImg[1]}"
                  alt="Gallery image 2"
                  class="w-100 border rounded small-img"
                />
              </div>
              <div class="col-3 mt-1">
                <img
                  id = "img2"
                  src="${productImg[2]}"
                  alt="Gallery image 3"
                  class="w-100 border rounded small-img"
                />
              </div>
              <div class="col-3 mt-1">
                <img
                  id = "img3"
                  src="${productImg[3]}"
                  alt="Gallery image 4"
                  class="w-100 border rounded small-img"
                />
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

  document.getElementById("prod-info-container").innerHTML =
    htmlContentToAppend;

  // Selector de imagenes

  let mainImg = document.getElementById("mainImg");
  let img0 = document.getElementById("img0");
  let img1 = document.getElementById("img1");
  let img2 = document.getElementById("img2");
  let img3 = document.getElementById("img3");

  img0.addEventListener("click", () => {
    mainImg.src = productImg[0];
    img0.classList.add("border-dark");
    img1.classList.remove("border-dark");
    img2.classList.remove("border-dark");
    img3.classList.remove("border-dark");
  });

  img1.addEventListener("click", () => {
    mainImg.src = productImg[1];
    img1.classList.add("border-dark");
    img0.classList.remove("border-dark");
    img2.classList.remove("border-dark");
    img3.classList.remove("border-dark");
  });

  img2.addEventListener("click", () => {
    mainImg.src = productImg[2];
    img2.classList.add("border-dark");
    img0.classList.remove("border-dark");
    img1.classList.remove("border-dark");
    img3.classList.remove("border-dark");
  });

  img3.addEventListener("click", () => {
    mainImg.src = productImg[3];
    img3.classList.add("border-dark");
    img0.classList.remove("border-dark");
    img1.classList.remove("border-dark");
    img2.classList.remove("border-dark");
  });
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
