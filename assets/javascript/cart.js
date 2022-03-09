{
  // hàm thay đổi giá trị số lượng sản phẩm

  const changeQuantity = function () {
    const ElmInputQuantity = $("#quantity");
    $(".icon-quantity").click(function () {
      let valueCurrentInput = +$("#quantity").val();
      if ($(this).hasClass("icon-minus") == true && valueCurrentInput == 1) {
        return;
      } else if ($(this).hasClass("icon-minus") == true) {
        ElmInputQuantity.val(`${valueCurrentInput - 1}`);
      } else {
        ElmInputQuantity.val(`${valueCurrentInput + 1}`);
      }

      const quantityProduct = $("#quantity").val();
      sessionStorage.setItem("quantity_product", `${quantityProduct}`);
    });
  };

  // hàm kiêm tra giá trị số lưởng sản phẩm người dùng nhập vào có đúng không. nếu không đúng thì xóa kí tự đó đi
  function checkQuantity(SelectorQuantityInput) {
    const ElmInputQuantity = document.querySelectorAll(SelectorQuantityInput);
    // hàm xóa các kí tự người dùng nhập vào ko phải là số

    if (!ElmInputQuantity) {
      return;
    }
    for (let i = 0; i < ElmInputQuantity.length; i++) {
      ElmInputQuantity[i].oninput = function () {
        let valueCurrentInput = $(ElmInputQuantity[i]).val();
        if (valueCurrentInput == "") {
          return;
        }
        let lengthCurrentInput = valueCurrentInput.length;
        let sliceLastCharacterValueInput = valueCurrentInput.slice(
          0,
          lengthCurrentInput - 1
        );
        if (
          (Number.isFinite(+valueCurrentInput[1]) != true &&
            valueCurrentInput[1] != undefined) ||
          Number.isFinite(+valueCurrentInput[0]) != true
        ) {
          $(ElmInputQuantity[i]).val(
            `${valueCurrentInput.slice(0, lengthCurrentInput - 1)}`
          );
        } else {
          return;
        }
      };
      //   nếu giá tị value input sau khi người dùng nhập xong mà =0

      $(ElmInputQuantity[i]).change(function () {
        if (+ElmInputQuantity[i].value == 0) {
          ElmInputQuantity[i].value = 1;
        }
      });
    }
  }
  function changeQuantityInput() {
    changeQuantity();
    checkQuantity(".product__quantity");
  }

  // hàm lấy data giỏ hàng trong localstore
  function getCartArrayProductLocalStore() {
    if (!localStorage.getItem("cart_product")) return [];
    return JSON.parse(localStorage.getItem("cart_product"));
  }
  // hàm lấy data sản phẩm hiện tại trong sessionStore
  function getObjDetailProduct() {
    const [ObjDetailProduct] = [
      ...JSON.parse(sessionStorage.getItem("detailProduct")),
    ];
    return ObjDetailProduct;
  }
  function deleteProduct(classRemove) {
    $(classRemove).click(function () {
      let elmProductItem;
      if (classRemove == ".cart-remove") {
        elmProductItem = $(this).parent().parent();
      } else {
        elmProductItem = $(this).parent().parent().parent().parent();
      }
      elmProductItem.remove();
      const idProductItem = elmProductItem.attr("data-id_product");
      const sizeProductItem = elmProductItem[0].querySelector(
        ".product__size-number"
      ).innerText;
      const newCartProduct = getCartArrayProductLocalStore().filter(
        (product) => {
          if (
            product.id_product != idProductItem ||
            product.size_product != sizeProductItem
          ) {
            return product;
          }
        }
      );
      localStorage.setItem("cart_product", JSON.stringify(newCartProduct));
      $(".modal .quantityProductOfCart").text($("tbody tr").length);
      $(".cart__number-product").text($("tbody tr").length);
      totalMoneyProduct();
      if ($("tbody tr").length == 0) {
        hideModalContent();
        showModalCartEmpty();
      }
      // Xóa xong lưu lại dự liệu lên save
      saveCartProductSever();
    });
  }
  // hàm ẩn phần modal_content khi giỏ hàng trống
  function hideModalContent() {
    $(".modal_content").css("display", "none");
  }
  // hàm hiện phần modal_content khi giỏ hàng trống
  function showModalCartEmpty() {
    console.log(1);
    $(".cart-empty").css("display", "block");
  }
  // hàm hiển  thị giỏ hàng trống và ẩn đi phần thông tin san phẩm và thanh toán(modal_content)

  const isCheckQuantityProductOfCart = function () {
    if ($("tbody tr").length == 0) {
      return false;
    }
    return true;
  };
  //   hàm kiểm tra xem giỏ hàng khi mới vào có trông hay không nếu trống thì hiển thi empy cart

  function showEmptyCartStart() {
    const arrayCartProduct = JSON.parse(localStorage.getItem("cart_product"));
    if (arrayCartProduct.length == 0) {
      showEmptyCart();
    }
  }
  showEmptyCartStart();

  //   hàm kiểm tra xem giỏ hàng khi xóa sản phẩm xong có trông hay kho nếu trống thì hiển thi empy cart
  function showEmptyCart() {
    if (!isCheckQuantityProductOfCart()) {
      $(".modal__cart-table").hide();
      $(".modal__checkout-actions").hide();
      $(".cart-empty")
        .css("border", "none")
        .css("marginBottom", "30px")
        .css("padding", "0")
        .fadeIn();
    }
  }
  // hàm  tạo và update  sản phẩm trong giỏ hàng
  function createCartProduct(product) {
    const productElm = $(
      "template#modal-cart-product"
    )[0].content.firstElementChild.cloneNode(true);
    if (!productElm) {
      return;
    }
    productElm.dataset.id_user = product.id_user;
    productElm.dataset.id_product = product.id_product;
    productElm.dataset.id = product.id;
    const imgProduct = productElm.querySelector("img");
    if (!imgProduct) return;

    imgProduct.src = product.image_product;
    const nameProduct = productElm.querySelector(".product__name");
    if (!nameProduct) return;

    nameProduct.textContent = product.name_product;
    const priceProduct = productElm.querySelectorAll(".product__price");
    if (!priceProduct) return;
    for (let i = 0; i < priceProduct.length; i++) {
      priceProduct[i].textContent = product.price_product;
    }
    const quantityProduct = productElm.querySelector(".product__quantity");
    if (!quantityProduct) return;
    quantityProduct.value = product.quantity_product;
    const priceTotalItemProduct = productElm.querySelector(
      ".product__priceTotalItem"
    );
    if (!priceTotalItemProduct) return;
    const valuePriceNumber = +product.price_product
      .slice(0, product.price_product.length - 1)
      .replaceAll(",", "");
    const showTotalItemProduct = stringToNumberMoney(
      +product.quantity_product * +valuePriceNumber
    );
    priceTotalItemProduct.textContent = showTotalItemProduct;
    const quantityProduct_mobile = productElm.querySelector(
      ".product__quantity-mobile"
    );
    if (!quantityProduct_mobile) return;
    quantityProduct_mobile.textContent = product.quantity_product;
    const sizeProduct = productElm.querySelectorAll(".product__size-number");
    if (!sizeProduct) return;
    sizeProduct[0].textContent = product.size_product;
    sizeProduct[1].textContent = product.size_product;

    return productElm;
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
  function renderCartProductItem(arrayCategoryProduct, productListId) {
    if (
      !Array.isArray(arrayCategoryProduct) ||
      arrayCategoryProduct.length === 0
    )
      return;
    const productList = document.getElementById(productListId);
    if (!productList) return;

    for (let product of arrayCategoryProduct) {
      const productItem = createCartProduct(product);
      productList.appendChild(productItem);
    }
    showEmptyCart();
    setTimeout(() => {
      changeQuantityInput();
    }, 500);
  }
  const arrayProductCart = JSON.parse(getCartProductLocalStore());
  renderCartProductItem(arrayProductCart, "product-cart-list");
  setTimeout(() => {
    changeQuantityModal();
    deleteProduct(".cart-remove");
    deleteProduct(".mobile-cart-remove");
    clickUpdateInfo();
    changePriceTotalProductItem();
  }, 1000);
  // hàm thay đổi giá tiền phần thành tiền khi thay đổi số lượng
  function changePriceTotalProductItem() {
    const getElmInputQuantity = $(".product__quantity");
    getElmInputQuantity.mouseover(function () {
      const ElmProductItem = this.parentElement.parentElement.parentElement;
      $(this).focusout(function () {
        const ElmQuantity = ElmProductItem.querySelector(".product__quantity");
        const ElmPrice = ElmProductItem.querySelector(".product__price");
        const ElmPriceTotalItem = ElmProductItem.querySelector(
          ".product__priceTotalItem"
        );

        // if (!Number.isFinite(ElmQuantity.textContent)) return;
        const valuePriceNumber = +ElmPrice.textContent
          .slice(
            0,
            ElmProductItem.querySelector(".product__price").textContent.length -
              1
          )
          .replaceAll(",", "");

        const showTotalItemProduct = stringToNumberMoney(
          +ElmQuantity.value * +valuePriceNumber
        );
        ElmPriceTotalItem.textContent = showTotalItemProduct;
        totalMoneyProduct();
      });
    });
  }
  // hàm hover cho nút giảm số lương minus
  const hoverMinus = function () {
    const ElmInputQuantity = $("#quantity");
    $(".icon-minus").hover(
      function () {
        if (+ElmInputQuantity.val() > 1) {
          $(this).css("color", "#fbb416");
        }
      },
      function () {
        if (+ElmInputQuantity.val() > 1) {
          $(this).css("color", "#212529");
        }
      }
    );
  };
  // hàm kiểm tra nếu giá trị của input<=1 thì sẽ đổi màu icon minus

  const checkValAndChangeColor = function () {
    const ElmInputQuantity = $("#quantity");
    if (+ElmInputQuantity.val() <= 1) {
      $(".icon-minus").css("color", "#888").css("cursor", "unset");
    } else {
      $(".icon-minus").css("color", "#212529").css("cursor", "pointer");
    }
  };
  // hàm thay đổi số lượng sản phẩm trong modal khi ngường dùng nhấn vào phấm tăng giảm
  function changeQuantityModal() {
    $("table .icon-quantity-modal").click(function () {
      console.log($(this));
      let ElmInputQuantityCart = $(this).parent().children().first();
      let valueCurrentInput = +ElmInputQuantityCart.val();
      if (
        $(this).hasClass("icon-minus-modal") == true &&
        valueCurrentInput == 1
      ) {
        return;
      } else if ($(this).hasClass("icon-minus-modal") == true) {
        ElmInputQuantityCart.val(`${valueCurrentInput - 1}`);
      } else {
        ElmInputQuantityCart.val(`${valueCurrentInput + 1}`);
      }
      hoverMinus();
      checkValAndChangeColor();
      // tinh lại thành tiền của mỗi sản phẩm
      const ElmProductItem = this.parentElement.parentElement.parentElement;
      const ElmQuantity = ElmProductItem.querySelector(".product__quantity");
      const ElmPrice = ElmProductItem.querySelector(".product__price");
      const ElmPriceTotalItem = ElmProductItem.querySelector(
        ".product__priceTotalItem"
      );
      const valuePriceNumber = +ElmPrice.textContent
        .slice(
          0,
          ElmProductItem.querySelector(".product__price").textContent.length - 1
        )
        .replaceAll(",", "");

      const showTotalItemProduct = stringToNumberMoney(
        +ElmQuantity.value * +valuePriceNumber
      );
      ElmPriceTotalItem.textContent = showTotalItemProduct;
      totalMoneyProduct();
    });
  }
  // hàm tính tổng tiền cần thanh toán
  function totalMoneyProduct() {
    const arrayMoneyProduct = document.querySelectorAll(
      ".product__priceTotalItem"
    );
    let totalMoney = 0;
    for (let i = 0; i < arrayMoneyProduct.length; i++) {
      const valuePriceNumber = +arrayMoneyProduct[i].textContent
        .slice(0, arrayMoneyProduct[i].textContent.length - 1)
        .replaceAll(",", "");
      totalMoney += +valuePriceNumber;
    }
    stringToNumberMoney(totalMoney);
    $(".modal__total-money").text(`Tổng : ${stringToNumberMoney(totalMoney)}`);
  }
  totalMoneyProduct();
  // hàm lấy data giỏ hàng trong localstore
  function getCartProductLocalStore() {
    return localStorage.getItem("cart_product");
  }
}
// hàm thay đổi số lượng sản phẩm
function modalChangeQuantity() {
  let arrayCartProduct = JSON.parse(localStorage.getItem("cart_product"));
  for (let i = 0; i < arrayCartProduct.length; i++) {
    arrayCartProduct[i].quantity_product = $(".product__quantity")[i]?.value;
  }
  localStorage.setItem("cart_product", JSON.stringify(arrayCartProduct));
}
function saveCartProductSever() {
  const id_user = localStorage.getItem("id");
  if (!id_user) return;
  fetch(`https://api-json-sever.herokuapp.com/api/account/${id_user}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cart: `${localStorage.getItem("cart_product")}`,
    }),
  });
}
// hàm người dùng click vào nút cập  nhật giỏ hàng lưu dữ liệu lên sever
function clickUpdateInfo() {
  $(".btn-update-to-cart").click(() => {
    modalChangeQuantity();
  });
}
// // set lại trạng thái khi người dùng ko ở trang thiết kế riêng
sessionStorage.setItem("isStatusDesign", "false");
