{
  // hàm sử dụng thư viện 3d xem anh 360 độ
  let fabricHeight = "377px";
  let fitHeight = "154px";
  let collarHeight = "92px";
  let cuffHeight = "84px";
  if (window.matchMedia && window.matchMedia("(max-width: 415px)").matches) {
    fabricHeight = "377px";
    fitHeight = "160px";
    collarHeight = "92px";
    cuffHeight = "84px";
  }
  if (window.matchMedia && window.matchMedia("(max-width: 380px)").matches) {
    fabricHeight = "340px";
    fitHeight = "150px";
    collarHeight = "88px";
    cuffHeight = "82px";
  }
  if (window.matchMedia && window.matchMedia("(max-width: 321px)").matches) {
    fabricHeight = "288px";
    fitHeight = "124px";
    collarHeight = "75px";
    cuffHeight = "68px";
  }
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
      $("#product__image").vc3dEye({
        imagePath: `assets/image/product_feature/So_mi/${fileImage}/`,
        totalImages: 24,
        imageExtension: "png",
      });
      saveDateProductDesign();
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
          $(this).next().css("height", `${fabricHeight}`);
        } else if ($(this).hasClass("select-fit__title")) {
          $(this).next().css("height", `${fitHeight}`);
        } else if ($(this).hasClass("select-collar__title")) {
          $(this).next().css("height", `${collarHeight}`);
        } else {
          $(this).next().css("height", `${cuffHeight}`);
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
    const sizeProduct = +$("select").val() || "42";
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
  // hàm kiểm tra ngườ dùng có click vào nút mua ngay trong thiết kế riêng hay không rồi lưu trạng thái vào vào session
  function saveStatusDesign() {
    $(".btn-buy-design").click(() => {
      sessionStorage.setItem("isStatusDesign", "true");
    });
  }
  saveStatusDesign();
  // hàm lưu lại size áo khi người dùng lựa chọn

  function saveSize() {
    $("select").click(() => {
      saveDateProductDesign();
    });
  }
  saveSize();
}
