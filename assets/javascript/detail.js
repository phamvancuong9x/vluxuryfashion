{
  // hàm thay đổi hình ảnh hiển thị chi tiết ản phẩm

  // const changeImage = function () {
  //   const imageLeft = document.querySelectorAll(
  //     ".detailProduct__image-left .image"
  //   );
  //   for (let i = 0; i < imageLeft.length; i++) {
  //     imageLeft[i].onclick = function () {
  //       for (let j = 0; j < imageLeft.length; j++) {
  //         imageLeft[j].style = `border-color :rgb(218, 218, 218)`;
  //       }
  //       this.style = `border-color :#000`;
  //       console.log();
  //       let linkImg = this.firstElementChild.src;
  //       document.querySelector(".detailProduct__image-right img").src = linkImg;
  //     };
  //   }
  // };
  const changeImage = function () {
    $(".detailProduct__image-left .image").click(function () {
      $(".detailProduct__image-left .image").css(
        "borderColor",
        "rgb(218, 218, 218)"
      );
      $(this).css("borderColor", "#000");
      $(".detailProduct__image-right img").attr(
        "src",
        $(this).children().attr("src")
      );
    });
  };
  // hàm thay đổi border size khi hiển thị sự lựa chọn của người dùng

  const changeBorderSize = function () {
    $(".detailProduct__size-item").click(function () {
      $(".detailProduct__size-item").removeClass("borderColor-active");
      $(this).addClass("borderColor-active");
      const sizeProduct = $(
        ".detailProduct__size-item.borderColor-active"
      ).text();
      renderCart();
      setTimeout(() => {
        deleteProduct(".cart-remove");
        deleteProduct(".mobile-cart-remove");
        totalMoneyProduct();
      }, 200);
    });
  };

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
      hoverMinus();
      renderCart();
      checkValAndChangeColor();
      setTimeout(() => {
        deleteProduct(".cart-remove");
        deleteProduct(".mobile-cart-remove");
        totalMoneyProduct();
      }, 200);
    });
  };

  // hàm thay đổi số lượng sản phẩm trong modal khi ngường dùng nhấn vào phấm tăng giảm
  function changeQuantityModal() {
    $("table .icon-quantity-modal").click(function () {
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
  // hàm kiêm tra giá trị số lưởng sản phẩm người dùng nhập vào có đúng không. nếu không đúng thì xóa kí tự đó đi
  function checkQuantity(SelectorQuantityInput, isCheckPositionInput = true) {
    const ElmInputQuantity = document.querySelectorAll(SelectorQuantityInput);
    // hàm xóa các kí tự người dùng nhập vào ko phải là số

    if (!ElmInputQuantity) {
      return;
    }
    for (let i = 0; i < ElmInputQuantity.length; i++) {
      ElmInputQuantity[i].oninput = function () {
        checkValAndChangeColor();
        hoverMinus();
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

  // hàm kiểm tra nếu giá trị của input<=1 thì sẽ đổi màu icon minus

  const checkValAndChangeColor = function () {
    const ElmInputQuantity = $("#quantity");
    if (+ElmInputQuantity.val() <= 1) {
      $(".icon-minus").css("color", "#888").css("cursor", "unset");
    } else {
      $(".icon-minus").css("color", "#212529").css("cursor", "pointer");
    }
  };

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

  // hàm hien thi tab

  const link = function (tabLists, tabDescribes, tabId, tabDescribeID) {
    let elmTabs = $(`.${tabLists}`);
    let ElmTabContents = $(`.${tabDescribes}`);
    let ElmTabId = $(`#${tabId}`);
    ElmTabId.click(() => {
      for (let i = 0; i < elmTabs.length; i++) {
        if (tabId == elmTabs[i].id) {
          $(elmTabs[i]).addClass("tab-activity").removeClass("bttn-tab");
        } else {
          $(elmTabs[i]).removeClass("tab-activity").addClass("bttn-tab");
        }
        if (tabDescribeID != ElmTabContents[i].id) {
          $(ElmTabContents[i]).css("display", "none").fadeOut();
        } else {
          $(ElmTabContents[i]).fadeIn();
        }
      }
    });
  };

  // hàm hien thi slider

  // function tabSlider(sliderID){
  function tabSlider(sliderID) {
    $(sliderID).slick({
      prevArrow:
        '<i class="a-left control-c prev slick-prev ti-angle-left"></i>',
      nextArrow:
        '<i class="a-right control-c prev slick-prev ti-angle-right"></i>',
      // autoplay: true,
      // autoplaySpeed: 5000,
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false,
          },
        },
      ],
    });
  }

  // hàm hiển thì modal khi người dùng click vào nút Thêm vào giở hàng
  const clickToShowModal = function (classBtnClick) {
    $(classBtnClick).click(function () {
      showModal(".modal");
    });
  };

  // hàm đóng mở modal
  const showModal = function (classModal) {
    $(classModal).css("display", "flex");
  };
  // hàm thoát modal
  function hideModal(classModal) {
    $(".modal__btn-close").click(function () {
      $(classModal).fadeOut();
      setTimeout(function () {
        $(".modal .cart-empty").css("display", "none");
        showModalContent();
      }, 400);
    });
  }
  function main() {
    changeImage();
    changeBorderSize();
    changeQuantity();
    checkQuantity("#quantity");
    checkQuantity(".product__quantity", false);
    checkValAndChangeColor();
    hoverMinus();
    link("tab", "tab-describe", "tab1", "tab1-content");
    link("tab", "tab-describe", "tab2", "tab2-content");
    clickToShowModal(".showModal");
    hideModal(".modal");
  }
  // lhàm lấy danh sách các sản pham tương tu
  function getDataAPI2() {
    const typeProduct = getTypeProduct();
    if (!typeProduct) return;
    fetch(
      `https://api-json-sever.herokuapp.com/api/categoryProduct?typeProduct=${typeProduct}&_limit=8`
    )
      .then((response) => response.json())
      .then((arrayProduct) => {
        renderSimilarProductItem(arrayProduct, "similarProduct__list");
        switchToPageDetailProduct();
        setTimeout(() => {
          tabSlider("#tab1-content .row");
        }, 200);
      });
  }
  // hàm lấy id sản phẩm muốn render ra
  function getIdProduct() {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get("id");
  }
  // hàm lấy typeProduct cua sản phẩm ;
  function getTypeProduct() {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get("typeProduct");
  }
  function getIsSale() {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get("isSale");
  }

  // hàm  tạo và update nội dung chi tiết sản phẩm
  function createAndUpdateProduct(product) {
    const productElm = $(
      "template#detailProduct-template"
    )[0].content.firstElementChild.cloneNode(true);
    if (!productElm) {
      return;
    }
    const ObjProduct = product;
    // changeElmText(arrayBreadcrumbs, );
    // changeElmText(arrayBreadcrumbs, ".collections__title");
    $(".breadcrumbs__linkPage-container span:nth-child(3)").text(
      "/ " + ObjProduct.name_product
    );
    $(".breadcrumbs__content-title").text(ObjProduct.name_product);
    // update tên sản phẩm
    updateTextElm(
      productElm,
      ".detailProduct__name",
      ObjProduct,
      "name_product"
    );
    // update giá sản phẩm
    updateTextElm(
      productElm,
      ".detailProduct__price",
      ObjProduct,
      "price_product"
    );
    // update mô tả sản phẩm
    updateHtmlElm(
      productElm,
      ".detailProduct__describer-content",
      ObjProduct,
      "describe"
    );
    // update ảnh sản phẩm
    productElm.querySelector(
      ".detailProduct__image-left .image:nth-child(1)"
    ).firstElementChild.src = ObjProduct.image_product_1;
    productElm.querySelector(
      ".detailProduct__image-left .image:nth-child(2)"
    ).firstElementChild.src = ObjProduct.image_product_2;

    if (ObjProduct.image_product_3) {
      productElm.querySelector(
        ".detailProduct__image-left .image:nth-child(3)"
      ).firstElementChild.src = ObjProduct.image_product_3;
    } else {
      productElm
        .querySelector(".detailProduct__image-left .image:nth-child(3)")
        .remove();
    }
    if (ObjProduct.image_product_4) {
      productElm.querySelector(
        ".detailProduct__image-left .image:nth-child(4)"
      ).firstElementChild.src = ObjProduct.image_product_4;
    } else {
      if (!ObjProduct.image_product_3) {
        productElm
          .querySelector(".detailProduct__image-left .image:nth-child(3)")
          .remove();
      } else {
        productElm
          .querySelector(".detailProduct__image-left .image:nth-child(4)")
          .remove();
      }
    }
    productElm.querySelector(".detailProduct__image-right img").src =
      ObjProduct.image_product_2;
    // hàm ẩn size nếu sản phẩm là phụ kiên
    if (getTypeProduct() == "phukien") {
      productElm.querySelector(".detailProduct__size").remove();
    }
    // update ảnh thông số size để người dùng lựa chon
    if (ObjProduct.vender_value_image != "null") {
      productElm.querySelector("#sizeSpecification img").src =
        ObjProduct.vender_value_image;
    } else {
      productElm.querySelector("#sizeSpecification .image").textContent =
        "Thông số sản phẩm đang được cập nhật !";
    }

    return productElm;
  }
  // hàm  tạo và update nội dung chi tiết sản phẩm
  function createSimilarProduct(product) {
    const productElm = $(
      "template#similarProduct__item"
    )[0].content.firstElementChild.cloneNode(true);
    if (!productElm) {
      return;
    }
    productElm.dataset.id = product.id;
    productElm.dataset.typeProduct = product.typeProduct;
    const imgProduct = productElm.querySelector("img");
    if (!imgProduct) return;

    imgProduct.src = product.image_product_2;
    const nameProduct = productElm.querySelector(".featured-products__name");
    if (!nameProduct) return;

    nameProduct.textContent = product.name_product;
    const priceProduct = productElm.querySelector(".featured-products__price");
    if (!priceProduct) return;
    priceProduct.textContent = product.price_product;
    return productElm;
  }
  // ham fetch Api lay du lieu và render ra thông tin chi tiết sản phảm
  function getDataAPI() {
    const idProduct = getIdProduct();
    if (!idProduct) return;
    fetch(
      `https://api-json-sever.herokuapp.com/api/categoryProduct?id=${idProduct}`
    )
      .then((response) => response.json())
      .then((arrayProduct) => {
        $("title").text(arrayProduct[0].name_product + " - VLUXURY");
        sessionStorage.setItem("detailProduct", JSON.stringify(arrayProduct));
        renderProductItem(arrayProduct, "detailProductContent");
        renderCart();
        deleteProduct(".cart-remove");
        deleteProduct(".mobile-cart-remove");
        totalMoneyProduct();
        setTimeout(function () {
          getDataAPI2();
        }, 300);
        setTimeout(function () {
          main();
        }, 800);
        saveBuyNow();
      });
  }
  getDataAPI();

  // hàm render ra danh sách sản phẩm tương tự
  function renderSimilarProductItem(arrayCategoryProduct, productListId) {
    if (
      !Array.isArray(arrayCategoryProduct) ||
      arrayCategoryProduct.length === 0
    )
      return;
    const productList = document.getElementById(productListId);
    if (!productList) return;
    for (let product of arrayCategoryProduct) {
      if (product.id == getIdProduct()) {
        continue;
      }
      const productItem = createSimilarProduct(product);
      productList.appendChild(createSimilarProduct(product));
    }
  }
  // hàm render nội dung chi tiết sản phẩm sản phẩm
  function renderProductItem(arrayProduct, ElmDetailProductContentId) {
    if (!Array.isArray(arrayProduct) || arrayProduct.length === 0) return;
    const ElmDetailProductContent = document.getElementById(
      ElmDetailProductContentId
    );
    if (!ElmDetailProductContent) return;
    const ElmDetailProduct = createAndUpdateProduct(arrayProduct[0]);
    ElmDetailProductContent.appendChild(ElmDetailProduct);
  }
  // ham update text cho Cac element

  function updateTextElm(productElm, ClassElm, ObjProduct, key) {
    productElm.querySelector(ClassElm).textContent = ObjProduct[`${key}`];
  }
  // ham update node Html cho Cac element
  function updateHtmlElm(productElm, ClassElm, ObjProduct, key) {
    if (!ObjProduct[`${key}`]) {
      productElm.querySelector(".detailProduct__describer").remove();
      return;
    }
    productElm.querySelector(ClassElm).innerHTML = ObjProduct[`${key}`];
  }
  // hàm thay đổi title-name breadcrumbs__linkPage
  const arrayBreadcrumbs = {
    vest: "Áo Vest Nam",
    somi: "Áo Sơ Mi Nam",
    quanau: "Quần Âu Nam",
    giay: "Giày Da Nam",
    phukien: "Phụ kiên",
  };

  // hàm thay đổi title text trong breadcrumbs
  function changeElmText(arrayBreadcrumbs, classElm) {
    const typeProduct = getTypeProduct();
    if (!typeProduct) return;
    $(classElm).text(arrayBreadcrumbs[`${typeProduct}`]);
  }
  changeElmText(
    arrayBreadcrumbs,
    ".breadcrumbs__linkPage-container span:nth-child(2)"
  );
  // hàm chuyển về trang chủ khi người dùng click vào thanh breadcrumbs
  function switchToPageHome() {
    $(".breadcrumbs__linkPage-container span:nth-child(1)").click(function () {
      window.location.assign("index.html");
    });
  }
  switchToPageHome();
  // hàm chuyển về trang danh sách sản phẩm khi người dùng click vào thanh breadcrumbs
  function switchToPageCategoryProduct() {
    const typeProduct = getTypeProduct();
    const isSale = false;
    $(".breadcrumbs__linkPage-container span:nth-child(2)").click(function () {
      window.location.assign(
        `categoryProduct.html?typeProduct=${typeProduct}&isSale=${isSale}`
      );
      // window.history.back();
    });
  }
  switchToPageCategoryProduct();
  // hàm chuyển về trang danh sách sản phẩm khi người dùng click vào nút xem thêm
  function clickBtnToPageCategoryProduct() {
    const typeProduct = getTypeProduct();
    const isSale = false;
    $(".similarProduct__btn").click(function () {
      window.location.assign(
        `categoryProduct.html?typeProduct=${typeProduct}&isSale=${isSale}`
      );
    });
  }
  clickBtnToPageCategoryProduct();

  // hàm chuyển đến trang chi tiết sản phẩm khi người dùng click và thêm params vào URL
  function switchToPageDetailProduct() {
    $(".featured-products__item").click(function () {
      window.location.assign(
        `detailProduct.html?typeProduct=${this.dataset.typeProduct}&id=${this.dataset.id}`
      );
    });
  }

  // =========================================cart===========================================================
  //  mảng tển thông tin của sản phâm trong giỏ hàng cần thay đổi
  const arayInfoProduct = [
    {
      nameInfo: "imgProduct",
      classInfo: "img",
      methodOfProduct: "image_product",
    },
    {
      nameInfo: "nameProduct",
      classInfo: ".product__name",
      methodOfProduct: "name_product",
    },
    {
      nameInfo: "priceProduct",
      classInfo: ".product__price",
      methodOfProduct: "price_product",
    },
    {
      nameInfo: "quantityProduct",
      classInfo: ".product__quantity",
      methodOfProduct: "quantity_product",
    },
    {
      nameInfo: "quantityProduct_mobile",
      classInfo: ".product__quantity-mobile",
      methodOfProduct: "quantity_product",
    },
    {
      nameInfo: "sizeProduct",
      classInfo: ".product__size-number",
      methodOfProduct: "size_product",
    },
  ];
  // hàm thay đổi từng loại thông tin  sản phẩn trong giỏ hàng
  function changeInfoProductItem(
    nameInfo,
    classInfo,
    product,
    productElm,
    methodOfProduct
  ) {
    nameInfo = productElm.querySelectorAll(classInfo);
    if (!nameInfo) return;
    for (let i = 0; i < nameInfo.length; i++) {
      nameInfo[i].textContent = product[methodOfProduct];
      if (methodOfProduct == "image_product") {
        nameInfo[i].src = product[methodOfProduct];
      }
      if (methodOfProduct == "quantity_product") {
        nameInfo[i].value = product[methodOfProduct];
      }
    }
  }

  // hàm tính tổng giá tiền của từng loại sản phẩm
  function totalMoneyProductItem(product, productElm) {
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
  }

  // hàm  tạo và update  thông tin các sản phẩm trong giỏ hàng
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

    // vòng lặp thay đổi từng thông tin sản phẩm
    for (let i = 0; i < arayInfoProduct.length; i++) {
      changeInfoProductItem(
        arayInfoProduct[i].nameInfo,
        arayInfoProduct[i].classInfo,
        product,
        productElm,
        arayInfoProduct[i].methodOfProduct
      );
    }
    totalMoneyProductItem(product, productElm);
    return productElm;
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
  }

  //hàm lưu các sản phảm trong giỏ hàng trên sever vào localStore
  function SaveProductCart() {
    const id_user = localStorage.getItem("id");
    if (!id_user) return;
    fetch(`https://api-json-sever.herokuapp.com/api/account/${id_user}`)
      .then((response) => response.json())
      .then((objProductCart) => {
        if (objProductCart?.cart?.length == 0) {
          localStorage.setItem("cart_product", "[]");
        } else {
          localStorage.setItem("cart_product", `${objProductCart.cart}`);
        }
      });
  }
  SaveProductCart();
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
  let arrayCartRender = [];

  // hàm kiểm tra sản phẩm đã có trong gio hàng hay chưa?
  function checkSizeProduct() {
    const sizeProduct = $(
      ".detailProduct__size-item.borderColor-active"
    ).text();
    const idProduct = JSON.parse(sessionStorage.getItem("detailProduct"))[0].id;
    if (getCartArrayProductLocalStore().length == 0) return false;
    for (let i = 0; i < getCartArrayProductLocalStore().length; i++) {
      if (
        getCartArrayProductLocalStore()[i].size_product == sizeProduct &&
        getCartArrayProductLocalStore()[i].id_product == idProduct
      )
        return true;
    }
    return false;
  }
  //tạo 1 mảng danh sách sản phẩm cần render gồm sản phẩm trong database + sản phẩm chuẩn bị render
  function createArrayCartRender() {
    const id_Product = getObjDetailProduct().id;
    const image_product = getObjDetailProduct().image_product_2;
    const sizeProduct = $(
      ".detailProduct__size-item.borderColor-active"
    ).text();
    const quantityProduct = $("#quantity").val();
    $("#product-cart-list").empty();
    if (checkSizeProduct())
      return JSON.parse(localStorage.getItem("cart_product"));
    if (getCartArrayProductLocalStore().length > 0) {
      arrayCartRender = [
        ...getCartArrayProductLocalStore(),
        {
          ...getObjDetailProduct(),
          id_product: id_Product,
          id: getCartArrayProductLocalStore().length + 1,
          size_product: sizeProduct,
          quantity_product: quantityProduct,
          image_product: image_product,
        },
      ];
    } else {
      arrayCartRender = [
        {
          ...getObjDetailProduct(),
          id_product: id_Product,
          id: getCartArrayProductLocalStore().length + 1,
          size_product: sizeProduct,
          quantity_product: quantityProduct,
          image_product: image_product,
        },
      ];
    }
    return arrayCartRender;
  }

  // render sản phẩm có sẳn trong giỏ hàng trên sever
  function renderCart() {
    renderCartProductItem(createArrayCartRender(), "product-cart-list");
    changePriceTotalProductItem();
    changeQuantityModal();
    setTimeout(() => {
      clickAddtocart();
    }, 300);
  }
  // hàm thay đổi giá tiền phần thành tiền khi thay đổi số lượng
  function changePriceTotalProductItem() {
    const getElmInputQuantity = $(".product__quantity");
    getElmInputQuantity.mouseover(function () {
      const ElmProductItem = this.parentElement.parentElement.parentElement;
      this.focusout = function () {
        const ElmQuantity = ElmProductItem.querySelector(".product__quantity");
        const ElmPrice = ElmProductItem.querySelector(".product__price");
        const ElmPriceTotalItem = ElmProductItem.querySelector(
          ".product__priceTotalItem"
        );
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
      };
    });
  }
  changePriceTotalProductItem();
  // hàm chuyển giá tiền từ dạng số dang dạng chuỗi có đấu phảy;
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
  // hàm click vào nút mua ngay thì se lưu vào sesion 1 biến buyNow
  sessionStorage.setItem("buyNow", "false");
  function saveBuyNow() {
    $(".btn__buyProduct").click(() => {
      sessionStorage.setItem("buyNow", "true");
    });
  }
  // hàm click vào nút add-to-cart
  function clickAddtocart() {
    $(".modal .quantityProductOfCart").text($("tbody tr").length);
    $(".btn__add-to-cart").click(() => {
      if (arrayCartRender.length != 0) {
        $(".quantityProductOfCart").text(`${arrayCartRender.length}`);
        $(".cart__number-product").text(`${arrayCartRender.length}`);
        localStorage.setItem("cart_product", JSON.stringify(arrayCartRender));
      }
    });
  }
  // hàm người dùng click vào nút cập  nhật giỏ hàng lưu dữ liệu lên sever
  function clickUpdateInfo() {
    $(".btn-save-info").click(() => {
      modalChangeQuantity();
      saveCartProductSever();
      setTimeout(() => {
        renderCart();
        setTimeout(() => {
          deleteProduct(".cart-remove");
          deleteProduct(".mobile-cart-remove");
          totalMoneyProduct();
        }, 100);
      }, 300);
    });
  }
  // hàm thay đổi số lượng sản phẩm
  function modalChangeQuantity() {
    let arrayCartProduct = JSON.parse(localStorage.getItem("cart_product"));
    for (let i = 0; i < arrayCartProduct.length; i++) {
      arrayCartProduct[i].quantity_product = $(".product__quantity")[i]?.value;
    }
    localStorage.setItem("cart_product", JSON.stringify(arrayCartProduct));
  }
  clickUpdateInfo();

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
}
// hàm click vào nút remove xóa sản phẩm
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
    const newCartProduct = getCartArrayProductLocalStore().filter((product) => {
      if (
        product.id_product != idProductItem ||
        product.size_product != sizeProductItem
      ) {
        return product;
      }
    });
    localStorage.setItem("cart_product", JSON.stringify(newCartProduct));
    $(".modal .quantityProductOfCart").text($("tbody tr").length);
    $(".cart__number-product").text($("tbody tr").length);
    totalMoneyProduct();
    if ($("tbody tr").length == 0) {
      hideModalContent();
      showModalCartEmpty();
    }
  });
}
// hàm ẩn phần modal_content khi giỏ hàng trống
function hideModalContent() {
  $(".modal_content").css("display", "none");
}
// hàm hiên phần modal_content khi giỏ hàng trống
function showModalContent() {
  $(".modal_content").css("display", "block");
}
// hàm ẩn phần cart-empty khi giỏ hàng không có
function hideModalCartEmpty() {
  $(".cart-empty").css("display", "none");
}
// hàm hiện phần modal_content khi giỏ hàng trống
function showModalCartEmpty() {
  $(".cart-empty").css("display", "block");
}

// // set lại trạng thái khi người dùng ko ở trang thiết kế riêng
sessionStorage.setItem("isStatusDesign", "false");
