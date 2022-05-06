// thêm ngoawch nhọn bao bên ngoài sẽ ko có lỗi trùng tên biến khai báo
// với file js khác khi cùng add vào html
const getNavInputSearch = $("#nav__input-search");
const getNavlinkSearch = $(".nav__link-search");
// const  elmBody = document.querySelector('body')
//  hàm tạo hiệu ứng cho header khi cuộn trang : scroll on page
const elmMainSlider = $(".main__slider");
const elmHeader = $("header");
const elmNav = $("nav");
//  hàm tạo hiệu ứng cho header khi cuộn trang : scroll on page và hiển thị nút back-to-top
function headerEffect() {
  window.onscroll = function () {
    if (window.pageYOffset >= $(".slider-header").innerHeight()) {
      elmNav.addClass("header-fixed");
      // elmMainSlider.css("marginTop", "72px");
      $(".menu-bars-container").css("top", "0");
      $(".menu-bars-container").css("height", "calc( 100vh + 32px)");
    } else {
      elmNav.removeClass("header-fixed");
      // elmMainSlider.css("marginTop", "0");
      $(".menu-bars-container").css("top", "32px");
    }
    showBackToTop();
  };
}
headerEffect();
// hàm ẩn hiện nút back-to-top
function showBackToTop() {
  if (window.pageYOffset > "450") {
    $("#btn-back-to-top").fadeIn();
  } else {
    $("#btn-back-to-top").fadeOut();
  }
}

function logIn() {
  if (localStorage.getItem("name") != null) {
    $(".nav__header-user").css("display", "none");
    $('.nav-mobile__center-item a[href="loginRegister.html"]').css(
      "display",
      "none"
    );
    $(".header__user").css("display", "block");
    $(".header-mobile__user").css("display", "flex");
    changeName(".header__user-name");
    changeName(".header-mobile__user-name");
    if (
      localStorage.getItem("url") &&
      localStorage.getItem("url") != "undefined"
    ) {
      $(".header-mobile__user-info img").attr(
        "src",
        `${localStorage.getItem("url")}`
      );
      $(".header__user-image>img").attr(
        "src",
        `${localStorage.getItem("url")}`
      );
    }
  }
}
logIn();
function changeName(classElmName) {
  $(classElmName)
    .text(localStorage.getItem("name"))
    .css("color", "#000")
    .css("text-transform", "capitalize");
  if (classElmName == ".header-mobile__user-name") {
    $(".header-mobile__user-name").css("color", "#fff");
    $(".header-mobile__user-name").parent().attr("style", "");
  }
}
function logOut(classElmLogOut) {
  $(classElmLogOut).click(function () {
    $(".nav__header-user").css("display", "block");
    $('.nav-mobile__center-item a[href="loginRegister.html"]').css(
      "display",
      "block"
    );
    $(".header__user").css("display", "none");
    $(".header-mobile__user").css("display", "none");
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("password");
    localStorage.removeItem("url");
    localStorage.removeItem("email");
    localStorage.removeItem("date");
    localStorage.removeItem("month");
    localStorage.removeItem("genderId");
    localStorage.removeItem("phone");
    localStorage.removeItem("year");
    localStorage.setItem("cart_product", "[]");
    $(".cart__number-product")?.text(`0`);
  });
}
logOut(".header__user-logout");
logOut(".header-mobile__user-logout");

//hàm check xem ô search input đã có giá trị hay chưa
function checkValueNavInput() {
  if (!getNavInputSearch.val().trim()) {
    {
      return false;
    }
  }
  return true;
}
//hàm check xem ô search input-mobile đã có giá trị hay chưa
const getNavInputSearchMobile = $("#nav-mobile__input-search");
function checkValueNavInputMobile() {
  if (!getNavInputSearchMobile.val().trim()) {
    {
      return false;
    }
  }
  return true;
}
// hàm dừng lại hành vi mặc định của thẻ a nếu kiểm tra người dùng chưa nhập dữ liệu và chuyển sang trang search
function switchSearchPage() {
  {
    getNavlinkSearch.click(function (even) {
      even.preventDefault();
      if (!checkValueNavInput()) {
      } else {
        sessionStorage.setItem("keywordSearch", `${getNavInputSearch.val()}`);
        window.location.assign(
          `search.html?title_like=${getNavInputSearch.val()}`
        );
      }
    });
  }
}
switchSearchPage();
//mobile: hàm dừng lại hành vi mặc định của thẻ a nếu kiểm tra người dùng chưa nhập dữ liệu và chuyển sang trang search
const getNavlinkSearchMobile = $(".nav-mobile__link-search");
function switchSearchPageMobile() {
  {
    getNavlinkSearchMobile.click(function (even) {
      even.preventDefault();
      if (!checkValueNavInputMobile()) {
      } else {
        sessionStorage.setItem(
          "keywordSearch",
          `${getNavInputSearchMobile.val()}`
        );
        window.location.assign(
          `search.html?title_like=${getNavInputSearchMobile.val()}`
        );
      }
    });
  }
}
switchSearchPageMobile();

// hàm kiểm tra người dùng nhập dữ hiệu hay chưa nếu rồi khi nhấn enter sẽ chuyển sang trang search

function enterToSwitchSearch() {
  if (!checkValueNavInputMobile() && !checkValueNavInput()) return;
  $(document).keypress(function (event) {
    const charCode = event.charCode ? event.charCode : event.which;
    if (charCode == "13") {
      sessionStorage.setItem("keywordSearch", `${getNavInputSearch.val()}`);
      window.location.assign(
        `search.html?title_like=${getNavInputSearch.val()}`
      );
    }
  });
}
function enterToSwitchSearchMobile() {
  if (!checkValueNavInputMobile() && !checkValueNavInput()) return;
  $(document).keypress(function (event) {
    const charCode = event.charCode ? event.charCode : event.which;
    if (charCode == "13") {
      sessionStorage.setItem(
        "keywordSearch",
        `${getNavInputSearchMobile.val()}`
      );
      window.location.assign(
        `search.html?title_like=${getNavInputSearchMobile.val()}`
      );
    }
  });
}
// hàm ngăn chặn hành vi mặc định khi bắt đầu click chuột vào thẻ a nhưng chưa nhả ra;
//  có tác dụng không làm mất đi focus ở thẻ input
function stopPreventDefaultMousedownNavlinkSearch() {
  getNavlinkSearch.mousedown(function (even) {
    even.preventDefault();
  });
}
stopPreventDefaultMousedownNavlinkSearch();
// hàm hiển thị sub menu mobile
function showSubMenuNav() {
  $(".nav-mobile__parent-menu i").click(function () {
    let lengthSubMenu = $(this).parent().next().children().length;
    // lengthSubMenu độ dài của submenu
    if ($(this).parent().next().css("height") == "0px") {
      if (lengthSubMenu == 5) {
        $(this).parent().next().css("height", "220px");
      } else {
        $(this).parent().next().css("height", "88px");
      }
      $(this).parent().parent().removeClass("nav-mobile__parent-menu-iconPlus");
    } else {
      $(this).parent().next().css("height", "0px");
      $(this).parent().parent().addClass("nav-mobile__parent-menu-iconPlus");
    }
  });
}
showSubMenuNav();

// hiển thị subMobile user
function showSubMenuNavUser() {
  $(".header-mobile__user-content i").click(function () {
    if ($(this).parent().next().css("height") == "0px") {
      $(this).parent().next().css("height", "132px");
      $(this).parent().parent().removeClass("header-user-container");
    } else {
      $(this).parent().next().css("height", "0px");
      $(this).parent().parent().addClass("header-user-container");
    }
  });
}
showSubMenuNavUser();

// hàm ẩn hiện menu mobile
function showMenuBars() {
  $(".menu-bars__icon-bars").click(function () {
    $(".menu-bars-container").css("right", "0px");
    $(".menu-bars__icon-bars").css("opacity", "0");
    // $('body').css('overflow','hidden')
  });
}
showMenuBars();
// ẩn menu bar
function hideMenuBars() {
  $(".menu-bars__close i").click(function (e) {
    $(".menu-bars-container").css("right", "-300px");
    // e.stopPropagation();
    // ngăn chặn sự kiện nổi bọt khi người dung click lên thẻ này;
    $(".menu-bars__icon-bars").css("opacity", "1");
    // $('body').css('overflow','auto')
  });
}
hideMenuBars();

// hàm show giở hàng và ẩn thanh tìm kiếm nếu có

function showCart() {
  $(".cart").click(function (e) {
    $(".nav__search").removeClass("showSubMenu");
    $(this).next().addClass("showSubMenu");
    $(this).next().next().addClass("showSubMenu");
    e.stopPropagation();
  });
}
showCart();
// ẩn giỏ hàng
function hideCart() {
  $(".header__quickview-cart").click(function (e) {
    e.stopPropagation();
  });
  $("body").click(function () {
    $(".header__quickview-cart").removeClass("showSubMenu");
  });
  $(".btnCloseQVCart").click(function () {
    $(this).parent().parent().removeClass("showSubMenu");
  });
}
hideCart();
// hàm hiện ra thanh tìm kiếm
function showSearch() {
  $(".nav__search-title").click(function () {
    $(this).next().toggleClass("showSubMenu");
  });
}
showSearch();

const isCheckQuantityProductOfCartHeader = function () {
  if ($(".cart__content .row").length == 0) {
    return false;
  }
  return true;
};

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
//  hàm chuyen den danh sách sản phẩm
function switchToPageCategoryProduct() {
  const elmTypeProduct = $(".typeProduct");
  if (!elmTypeProduct) return;
  elmTypeProduct.click(function () {
    const valueTypeProduct = this.dataset.typeProduct;
    const valueIsSale = this.dataset.isSale;
    window.location.assign(
      `categoryProduct.html?typeProduct=${valueTypeProduct}&isSale=${valueIsSale}`
    );
  });
}
switchToPageCategoryProduct();

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
      showQuantityProductOfCart();
    });
}
SaveProductCart();
// hàm hiển thị số lượng sản phẩm có trong giỏ hàng

function showQuantityProductOfCart() {
  if (!localStorage.getItem("cart_product")) return;
  const arrayCartProduct = JSON.parse(localStorage.getItem("cart_product"));

  $(".cart__number-product").text(`${arrayCartProduct.length}`);
}
showQuantityProductOfCart();
// // hàm tạo cho người dùng chưa đăng kí 1 Id random không trùng với id có sẵn

// function createId() {
//   const id = Math.floor(100000 * Math.random());
//   if (!localStorage.getItem("id")) {
//     localStorage.setItem("id", `${id}`);
//   }
// }
// createId();

// hàm ẩn thẻ span trong breackcrumb
function hideSpanBreadcrumbs() {
  if ($(".breadcrumbs__linkPage-container >span:nth-child(3)").text() == "") {
    $(".breadcrumbs__linkPage-container >span:nth-child(3)").remove();
  }
}
hideSpanBreadcrumbs();
