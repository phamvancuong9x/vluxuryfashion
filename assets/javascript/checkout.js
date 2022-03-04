// function người dùng click chuyển sang bước phương thức thnah toán

const nextStep = function () {
  $(".info-ship__footer-btn").click(function () {
    $(".info-ship").css("display", "none");
    $(".payment-methods ").css("display", "block");
  });
};
nextStep();
// hàm chuyển lại bước trước
const prevStep = function () {
  $(".step-prev").click(function () {
    $(".info-ship").css("display", "block");
    $(".payment-methods ").css("display", "none");
  });
};
prevStep();

//
const showHideProduct = function () {
  $(".toggle-product-cart").click(function () {
    $(".product-list").fadeToggle();
  });
};
showHideProduct();

// function hiển thị modal khi click vào nút  mua hàng
const showModal = function () {
  $(".payment-methods__btn-buy").click(function () {
    deleteProductAllCart();
    $(".modal").css("display", "flex");
    SwitchToHomePage(20);
  });
};
showModal();

// hàm chuyển về trang trủ và chạy thời gian chuyển
function SwitchToHomePage(seconds) {
  $(".changePageHome__time").text(`${seconds}`);

  countdown(seconds);
  const switchHomePageId = setTimeout(() => {
    window.location.replace("index.html");
  }, seconds * 1000);
  cancelSwitchToHomePage(switchHomePageId);
}

function countdown(seconds) {
  let currentSeconds = seconds - 1;
  let intervalId = setInterval(function () {
    $(".changePageHome__time").text(`${currentSeconds}`);
    currentSeconds -= 1;
  }, 1000);
  if (intervalId <= 0) {
    clearInterval(intervalId);
  }
}
// hàm dừng việc chuyển về trang chủ

function cancelSwitchToHomePage(id) {
  $(".cancel").click(function () {
    clearTimeout(id);
    $(".changePageHome").fadeOut();
  });
}
//
// hàm  tạo và update  sản phẩm trong giỏ hàng
function createCartProduct(product) {
  const productElm = $(
    "template#product_item"
  )[0].content.firstElementChild.cloneNode(true);
  if (!productElm) {
    return;
  }
  const imgProduct = productElm.querySelector("img");
  if (!imgProduct) return;
  imgProduct.src = product.image_product;
  const nameProduct = productElm.querySelector(".product__name");
  if (!nameProduct) return;

  nameProduct.textContent = product.name_product;
  const priceProduct = productElm.querySelector(".product__price");
  priceProduct.textContent = product.price_product;
  const quantityProduct = productElm.querySelector(".product_quantity");
  if (!quantityProduct) return;
  quantityProduct.textContent = product.quantity_product;
  const sizeProduct = productElm.querySelector(".product__size");
  if (!sizeProduct) return;
  sizeProduct.textContent = product.size_product;
  return productElm;
}
// hàm tính tổng tiền cần thanh toán
function totalMoneyProduct() {
  const arrayMoneyProduct = JSON.parse(localStorage.getItem("cart_product"));
  let totalMoney = 0;
  for (let i = 0; i < arrayMoneyProduct.length; i++) {
    totalMoney +=
      +arrayMoneyProduct[i].priceNumber *
      +arrayMoneyProduct[i].quantity_product;
  }
  $(".information-order__sum-price").html(
    `Tổng Tiền:  <span>${stringToNumberMoney(totalMoney)}</span>`
  );
}
// hàm chuển giá tiền từ dạng số dang dạng chuỗi có đấu phảy;
function stringToNumberMoney(numberMoney) {
  const stringMoneyStart = numberMoney.toString();
  let count = 0;
  let term = "";
  let stringMoneyEnd = "";
  for (let i = stringMoneyStart.length - 1; i >= 0; i--) {
    count++;
    if (count == 4) {
      count = 0;
      term += ",";
      i++;
    } else {
      term += stringMoneyStart[i];
    }
  }
  for (let i = term.length - 1; i >= 0; i--) {
    stringMoneyEnd += term[i];
  }
  return stringMoneyEnd + "₫";
}
// hàm render ra danh sách sản phẩm trong gio hang
function renderCartProductItem(arrayCategoryProduct, productListClass) {
  if (!Array.isArray(arrayCategoryProduct) || arrayCategoryProduct.length === 0)
    return;
  const productList = document.querySelector(productListClass);
  if (!productList) return;

  for (let product of arrayCategoryProduct) {
    const productItem = createCartProduct(product);
    productList.appendChild(productItem);
  }
}

// hàm render ra sản phẩm tùy vào đầu vào
function renderProduct() {
  if (sessionStorage.getItem("isStatusDesign") == "false") {
    const arrayProductCart = JSON.parse(getCartProductLocalStore());
    renderCartProductItem(arrayProductCart, ".product-list");
    totalMoneyProduct();
  } else {
    renderCartProductItem(getArrayDesignProduct(), ".product-list");
    $(".information-order__sum-price").html(
      `Tổng Tiền:  <span>${getArrayDesignProduct()[0].price_product}</span>`
    );
  }
}
renderProduct();

// hàm lấy data giỏ hàng trong localstore
function getCartProductLocalStore() {
  return localStorage.getItem("cart_product");
}

// hàm lấy thông tin sản phẩm design nếu có
function getArrayDesignProduct() {
  if (sessionStorage.getItem("isStatusDesign") == "false") return [];

  return JSON.parse(sessionStorage.getItem("arrayInfoProductDesign"));
}

// hàm láy thông tin người dùng nhập vào render ra đơn hàng thành công
function renderInfoOrder() {
  $(".info-ship__footer-btn").click(() => {
    const codeOrder = "#" + Math.floor(100000 * Math.random());
    const nameBuyer = $("#name").val();
    const phoneBuyer = $("#phone-number").val();
    const addressBuyer = $(".city").val();
    $(".modal__code-orders-text p:nth-child(2)").text(
      `Mã đơn hàng ${codeOrder}`
    );
    $(".modal__name ").text(`Tên khách hàng: ${nameBuyer}`);
    $(".modal__number-phone").text(`Số điện thoại: ${phoneBuyer}`);
  });
}
renderInfoOrder();
// hàm click vào nút đặt hàng thì xóa sản phẩm trong giỏ hàng
function deleteProductAllCart() {
  const id_user = localStorage.getItem("id");
  localStorage.setItem("cart_product", "[]");
  if (!id_user) return;
  fetch(`https://api-json-sever.herokuapp.com/api/account/${id_user}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cart: `[]`,
    }),
  });
}

// Xử lý thông tin nếu người dùng dã dăng nhập

// hàm kiểm tra người dùng đã đăng nhập chưa
function checkLogin() {
  const userId = localStorage.getItem("id");
  if (userId) {
    return true;
  }
  return false;
}
// hàm hiển lấy tên người dung nếu đã đăng nhập và ẩn link dẫn đến trang đăng nhập
function getNameUser() {
  if (!checkLogin()) return;
  const nameUser = localStorage.getItem("name");
  if (!nameUser) return;
  $(".linkToLoginPage").css("display", "none");
  $("#name").val(nameUser);
}
getNameUser();
// hàm lấy các thông tin email từ phần thông tin cá nhân của người dùng
function getInfoUser(value, id) {
  if (!checkLogin()) return;
  const dataUser = localStorage.getItem(value);
  if (!dataUser) return;
  $(id).val(dataUser);
}
getInfoUser("email", "#email");
getInfoUser("phone", "#phone-number");
