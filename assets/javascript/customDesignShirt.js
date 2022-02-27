// hàm sử dụng thư viện 3d xem anh 360 độ
(() => {
  $(document).ready(function () {
    $("#product__image").vc3dEye({
      imagePath: "assets/image/product_feature/So_mi/shirt-01/", // the location where you’ve put the images.
      totalImages: 24, // the number of images you have.
      imageExtension: "png",
      // the extension of the images. Make sure all the images have same extension.
    });
  });
})();

// hàm thay đổi ảnh sản phẩm

function changeImageProduct() {
  $(".select-fabric__item").click(function () {
    const fileImage = this.dataset.shirt;
    console.log(fileImage);
    $("#product__image").vc3dEye({
      imagePath: `assets/image/product_feature/So_mi/${fileImage}/`,
      totalImages: 24,
      imageExtension: "png",
    });
  });
}
changeImageProduct();
//  hàm click vào hiển thị ra select__list
(function showSelectList() {
  $(".select__title").click(function () {
    $(".select__title").addClass("iconPlus");
    if ($(this).next().css("height") == "0px") {
      $(".select__list").css("height", "0");
      if ($(this).hasClass("select-fabric__title")) {
        $(this).next().css("height", "370px");
      } else if ($(this).hasClass("select-fit__title")) {
        $(this).next().css("height", "154px");
      } else if ($(this).hasClass("select-collar__title")) {
        $(this).next().css("height", "92px");
      } else {
        $(this).next().css("height", "84px");
      }
      $(this).removeClass("iconPlus");
    } else {
      $(this).next().css("height", "0px");
    }
  });
})();

// hàm click vào item đổi màu border

function changeBorder(classElmSelect) {
  $(classElmSelect).click(function () {
    $(classElmSelect).css("borderColor", "#e8e8e8");
    $(this).css("borderColor", "#666");
    $(this).parent().parent().parent().prev()[0].lastElementChild.style =
      "background-position: right -20px";
  });
}
changeBorder(".select-fabric__item .image img");
changeBorder(".select-fit__item .image img");
changeBorder(".select-collar__item .image img");
changeBorder(".select-cuff__item .image img");

// hàm lưu dữ liệu sản phẩm đã chọn vào sessionStorage

function saveDateProductDesign() {
  const srcImg = $("#product__image img").attr("src");
  const sizeProduct = +$("select").val() || "48";
  const priceProduct = $(".price__product").text();
  const arrayInfoProductDesign = [
    {
      image_product: srcImg,
      size_product: sizeProduct.toString(),
      quantity_product: "1",
      name_product: "ÁO SƠ MI RIÊNG",
      price_product: priceProduct,
    },
  ];
  sessionStorage.setItem(
    "arrayInfoProductDesign",
    JSON.stringify(arrayInfoProductDesign)
  );
}
setTimeout(() => {
  saveDateProductDesign();
}, 1000);

// hàm kiểm tra ngườ dùng có click vào nút mua ngay trong thiết kế riêng hay không rồi lưu trạng thái vào vào session
function saveStatusDesign() {
  $(".btn-buy-design").click(() => {
    sessionStorage.setItem("isStatusDesign", "true");
  });
}
saveStatusDesign();
