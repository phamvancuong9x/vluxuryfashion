function showFilter() {
  $(".collections__filter-name span").click(function () {
    $(".collections__filter-list").css("left", "0px");
  });
}
showFilter();
function hideFilter() {
  $(".collections__filter-list i").click(function (e) {
    $(".collections__filter-list").css("left", "-310px");
  });
}
hideFilter();

// set giá trị url cơ bắt đầu

function initUrl() {
  const url = new URL(window.location);
  if (!url.searchParams.get("typeProduct")) {
    url.searchParams.set("typeProduct", "vest");
  }
  if (!url.searchParams.get("isSale")) url.searchParams.set("isSale", "false");
  if (!url.searchParams.get("_page")) url.searchParams.set("_page", "1");
  if (!url.searchParams.get("_limit")) url.searchParams.set("_limit", "12");
  history.pushState({}, "", url);
  return url;
}
initUrl();
// ham fetch Api lay du lieu

function getDataAPI() {
  const queryParams = new URLSearchParams(window.location.search);
  const pageUrl = queryParams.get("_page");
  const limitUrl = queryParams.get("_limit");
  const isSaleUrl = queryParams.get("isSale");
  const typeProduct = queryParams.get("typeProduct");
  let URL = `https://api-json-sever.herokuapp.com/api/categoryProduct?${queryParams}`;
  if (typeProduct == "categoryProductSale") {
    URL = `https://api-json-sever.herokuapp.com/api/categoryProduct?isSale=${isSaleUrl}&_page=${pageUrl}&_limit=${limitUrl}`;
    checkSaleShowPrice();
  }
  showPagination();
  fetch(URL)
    .then((response) => response.json())
    .then((arrayCategoryProduct) => {
      // bỏ loading
      $(".loading").addClass("disabled");
      // render sản phẩm
      renderProductItem(arrayCategoryProduct, "category-products-list");
      switchToPageDetailProduct();
    })
    .then(() => {});
}
getDataAPI();
// hàm lấy typeProduct cua sản phẩm ;
function getTypeProduct() {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get("typeProduct");
}
// hàm lấy isSale cua sản phẩm ;
function getIsSale() {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get("isSale");
}

// hàm tạo 1 sản phẩm
function creatElmProduct(product) {
  if (!product) return;
  const productElm = $(
    "template#category_product-item"
  )[0].content.firstElementChild.cloneNode(true);
  if (!productElm) return;
  productElm.dataset.id = product.id;
  productElm.dataset.typeProduct = product.typeProduct;
  const imgProduct = productElm.querySelector("img");
  if (!imgProduct) return;
  imgProduct.src = product.image_product_2;
  const nameProduct = productElm.querySelector(".category-products__name");
  if (!nameProduct) return;
  nameProduct.textContent = product.name_product;
  const priceProduct = productElm.querySelector(".category-products__price");
  if (!priceProduct) return productElm;
  priceProduct.textContent = product.price_product;
  const discountSale = productElm.querySelector(".discount");
  if (!discountSale) return productElm;
  discountSale.textContent = product.discount_sale;
  const initialPrice = productElm.querySelector(".initialPrice");
  if (!initialPrice) return productElm;
  initialPrice.textContent = product.initialPrice;
  return productElm;
}
// hàm render ra danh sách sản phẩm
function renderProductItem(arrayCategoryProduct, categoryProductListId) {
  if (!Array.isArray(arrayCategoryProduct) || arrayCategoryProduct.length === 0)
    return;
  const productList = document.getElementById(categoryProductListId);
  if (!productList) return;
  for (let product of arrayCategoryProduct) {
    const productItem = creatElmProduct(product);
    productList.appendChild(productItem);
  }
}
// hàm thay đổi title-name breadcrumbs__linkPage
const arrayBreadcrumbs = {
  vest: "Áo Vest Nam",
  somi: "Áo Sơ Mi Nam",
  quanau: "Quần Âu Nam",
  giay: "Giày Da Nam",
  phukien: "Phụ Kiện",
  categoryProductSale: "Sản Phẩm Khuyến Mãi",
};

// hàm thay đổi title text trong breadcrumbs
function changeElmText(arrayBreadcrumbs, classElm) {
  const typeProduct = getTypeProduct();
  if (!typeProduct) return;
  $(classElm).text(arrayBreadcrumbs[`${typeProduct}`]);
  $("title").text(arrayBreadcrumbs[`${typeProduct}`] + " - VLUXURY");
}
changeElmText(
  arrayBreadcrumbs,
  ".breadcrumbs__linkPage-container span:nth-child(2)"
);
changeElmText(arrayBreadcrumbs, ".breadcrumbs__content-title");
changeElmText(arrayBreadcrumbs, ".collections__title");

// hàm chuyển đến trang chi tiết sản phẩm khi người dùng click và thêm params vào URL
function switchToPageDetailProduct() {
  $(".category-products__item").click(function () {
    window.location.assign(
      `detailProduct.html?typeProduct=${this.dataset.typeProduct}&id=${this.dataset.id}`
    );
  });
}
// hàm chuyển về trang chủ khi người dùng click vào thanh breadcrumbs
function switchToPageHome() {
  $(".breadcrumbs__linkPage-container span:nth-child(1)").click(function () {
    window.location.assign("index.html");
  });
}
switchToPageHome();

// hàm lấy giá trị của bộ lọc khi người dùng click vào

function getPriceFilter() {
  $('input[type="radio"]').click(function () {
    const price_number_lte = $(this).parent().parent()[0]
      .dataset.productnumberlte;
    const price_number_gte = $(this).parent().parent()[0]
      .dataset.productnumbergte;
    const typeProduct = getTypeProduct();
    if (!typeProduct) return;
    const isSale = getIsSale();
    if (!isSale) return;
    let URL = `https://api-json-sever.herokuapp.com/api/categoryProduct?typeProduct=${typeProduct}&isSale=${isSale}&_page=1&_limit=12`;
    if (typeProduct == "categoryProductSale") {
      URL = `https://api-json-sever.herokuapp.com/api/categoryProduct?isSale=${isSale}&_page=1&_limit=12`;
      // kiểm tra nếu sản phẩm khuyến mãi thì hiển thị thêm giá ban đầu
      checkSaleShowPrice();
    }
    fetch(URL)
      .then((response) => response.json())
      .then((arrayCategoryProduct) => {
        $("#category-products-list").empty();
        // if()
        let arrayProducts = [];
        if (price_number_lte != "null" && price_number_gte != "null") {
          arrayProducts = arrayCategoryProduct.filter(function (product) {
            if (
              (+product.priceNumber > +price_number_gte) &
              (+product.priceNumber < +price_number_lte)
            ) {
              return product;
            }
          });
        } else if (price_number_lte == "null" && price_number_gte != "null") {
          arrayProducts = arrayCategoryProduct.filter(function (product) {
            if (+product.priceNumber > +price_number_gte) {
              return product;
            }
          });
        } else if (price_number_lte != "null" && price_number_gte == "null") {
          arrayProducts = arrayCategoryProduct.filter(function (product) {
            if (+product.priceNumber < +price_number_lte) {
              return product;
            }
          });
        }
        if (price_number_lte == "null" && price_number_gte == "null") {
          arrayProducts = [...arrayCategoryProduct];
        }
        if (arrayProducts.length == 0) {
          $(".pagination").css("display", "none");
          $("#category-products-list").html(
            '<p style="text-align:center">Không có sản phẩm phù hợp với yêu cầu !</p>'
          );
        } else {
          $(".pagination").css("display", "flex");
        }

        renderProductItem(arrayProducts, "category-products-list");
      })
      .then(() => {
        setTimeout(() => {
          switchToPageDetailProduct();
        }, 400);
      });
  });
}
getPriceFilter();

// hàm sắp sếp sản phẩm theo giá cả

function sortPriceProduct() {
  $("select").change(function () {
    let minMax;
    if ($("select").val().trim() == "Giá từ thấp tới cao") {
      minMax = true;
    } else if ($("select").val().trim() == "Giá từ cao tới thấp") {
      minMax = false;
    }
    const typeProduct = getTypeProduct();
    if (!typeProduct) return;
    const isSale = getIsSale();
    if (!isSale) return;
    let URL = `https://api-json-sever.herokuapp.com/api/categoryProduct?typeProduct=${typeProduct}&isSale=${isSale}&_page=1&_limit=12`;
    if (typeProduct == "categoryProductSale") {
      URL = `https://api-json-sever.herokuapp.com/api/categoryProduct?isSale=${isSale}&_page=1&_limit=12`;
      checkSaleShowPrice();
    }
    fetch(URL)
      .then((response) => response.json())
      .then((arrayCategoryProduct) => {
        $(".pagination").css("display", "none");
        $("#category-products-list").empty();
        sortPriceArray(arrayCategoryProduct, minMax);
        setTimeout(function () {
          renderProductItem(arrayCategoryProduct, "category-products-list");
        }, 100);
        setTimeout(() => {
          $(".pagination").css("display", "flex");
        }, 500);
      })
      .then(() => {
        setTimeout(() => {
          switchToPageDetailProduct();
        }, 400);
      });
  });
}
sortPriceProduct();

// hàm lấy ra các giá sản phẩm và sắp sếp từ thấp đến cao
function sortPriceArray(arrayCategoryProduct, minMax = true) {
  for (let i = 0; i < arrayCategoryProduct.length - 1; i++) {
    for (let j = i + 1; j < arrayCategoryProduct.length; j++) {
      if (minMax == true) {
        if (
          +arrayCategoryProduct[i].priceNumber >
          +arrayCategoryProduct[j].priceNumber
        ) {
          let term = arrayCategoryProduct[i];
          arrayCategoryProduct[i] = arrayCategoryProduct[j];
          arrayCategoryProduct[j] = term;
          j--;
        }
      } else {
        if (
          +arrayCategoryProduct[i].priceNumber <
          +arrayCategoryProduct[j].priceNumber
        ) {
          let term = arrayCategoryProduct[i];
          arrayCategoryProduct[i] = arrayCategoryProduct[j];
          arrayCategoryProduct[j] = term;
          j--;
        }
      }
    }
  }
  return arrayCategoryProduct;
}

//  kiểm tra xem sản phàm có khiến mãi không thì hiển thị giá ban đầu

function checkSaleShowPrice() {
  $("#category_product-item")[0].content.firstElementChild.querySelector(
    ".discount"
  ).style = "display:block";

  $("#category_product-item")[0].content.firstElementChild.querySelector(
    ".initialPrice"
  ).style = "display:block";
}

// hàm click vào pagination number đổi mầu background

function activityPagination() {
  $(".page-number").click(function () {
    $(".page-number").removeClass("activePagination");
    $(this).addClass("activePagination");
    let pageUrl = $(this).text();
    $("#category-products-list").empty();
    hidePagination();
    handleFilterChange("_page", +pageUrl);
    if (pageUrl == 2) {
      $(".prev-btn").css("display", "block");
      $(".next-btn").css("display", "none");
    } else {
      $(".prev-btn").css("display", "none");
      $(".next-btn").css("display", "block");
    }
  });
}
activityPagination();

// thay đổi param url bằng history.pushState()

function handleFilterChange(filterName, filterValue) {
  // update query param
  const url = new URL(window.location);
  url.searchParams.set(filterName, filterValue);
  history.pushState({}, "", url);
  getDataAPI();
}

// hàm xử lý phân trang
function initPagination() {
  const ulPagination = $(".pagination")[0];
  if (!ulPagination) return;
  const prevLink = ulPagination.firstElementChild?.firstElementChild;
  const nextLink = ulPagination.lastElementChild?.firstElementChild;
  $(prevLink).click(() => {
    $(prevLink).parent().css("display", "none");
    $(nextLink).parent().css("display", "block");
    let pageUrl = new URLSearchParams(window.location.search).get("_page");
    if (pageUrl > 1) {
      $("#category-products-list").empty();
      hidePagination();
      handleFilterChange("_page", +pageUrl - 1);
      const pageActivityCurrent = $(".activePagination");
      pageActivityCurrent.removeClass("activePagination");
      pageActivityCurrent
        .parent()
        .prev()
        .children()
        .addClass("activePagination");
    }
  });
  $(nextLink).click(() => {
    $(nextLink).parent().css("display", "none");
    $(prevLink).parent().css("display", "block");
    let pageUrl = new URLSearchParams(window.location.search).get("_page");
    if (pageUrl < 2) {
      $("#category-products-list").empty();
      hidePagination();
      handleFilterChange("_page", +pageUrl + 1);
      const pageActivityCurrent = $(".activePagination");
      pageActivityCurrent.removeClass("activePagination");
      pageActivityCurrent
        .parent()
        .next()
        .children()
        .addClass("activePagination");
    }
  });
}
initPagination();

// hàm hiển thị thanh pagination
function showPagination() {
  const queryParams = new URLSearchParams(window.location.search);
  const isSaleUrl = queryParams.get("isSale");
  const typeProduct = queryParams.get("typeProduct");
  let URL = `https://api-json-sever.herokuapp.com/api/categoryProduct?typeProduct=${typeProduct}&isSale=${isSaleUrl}`;
  if (typeProduct == "categoryProductSale") {
    URL = `https://api-json-sever.herokuapp.com/api/categoryProduct?isSale=${isSaleUrl}`;
    checkSaleShowPrice();
  }
  fetch(URL)
    .then((response) => response.json())
    .then((arrayCategoryProduct) => {
      if (arrayCategoryProduct.length > 1) {
        setTimeout(() => {
          if (arrayCategoryProduct.length > 12) {
            $(".pagination").css("display", "flex");
          }
        }, 500);
      } else {
        if (arrayCategoryProduct.length >= 12) {
          $(".pagination").css("display", "none");
        }
      }
    });
}
function hidePagination() {
  $(".pagination").css("display", "none");
}
