// ham fetch Api lay du lieu
function getDataAPI() {
  const title = getTitle();
  $("#search-text").text(`\" ${getTitle()}\"`);
  if (!title) return;
  let URL = `https://api-json-sever.herokuapp.com/api/categoryProduct?title_like=${title}`;
  fetch(URL)
    .then((response) => response.json())
    .then((arrayCategoryProduct) => {
      if (arrayCategoryProduct.length == 0) {
        console.log(arrayCategoryProduct.length == 0);
        $("h2").html(
          `<p>KHÔNG CÓ KẾT QUẢ TÌM KIẾM CHO TỪ KHÓA :<span> \" ${sessionStorage.getItem(
            "keywordSearch"
          )} \"</span> </p> `
        );
      } else {
        renderProductItem(arrayCategoryProduct, "category-products-list");
        $("h2").html(
          `<p> KẾT QUẢ TÌM KIẾM CHO TỪ KHÓA : <span>\"${sessionStorage.getItem(
            "keywordSearch"
          )}\"</span></p>`
        );
      }
    })
    .then(() => {
      switchToPageDetailProduct();
    });
}
getDataAPI();
// hàm lấy title cua sản phẩm ;
function getTitle() {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get("title_like");
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
  // console.log(productElm);
  // console.log(initialPrice);
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
// hàm chuyển đến trang chi tiết sản phẩm khi người dùng click và thêm params vào URL
function switchToPageDetailProduct() {
  $(".category-products__item").click(function () {
    window.location.assign(
      `detailProduct.html?typeProduct=${this.dataset.typeProduct}&id=${this.dataset.id}`
    );
  });
}
//thay đổi 1 số css trong trang search
function changeCssSearchPage() {
  $(".container").css("minHeight", "40vh");
  $("#category-products-list").css("justifyContent", "center");
  $(".collections__header h2").css("textAlign", "center");
}
changeCssSearchPage();
