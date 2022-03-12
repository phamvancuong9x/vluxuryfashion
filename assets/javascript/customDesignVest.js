{
  // hàm sử dụng thư viện 3d xem anh 360 độ
  let fabricHeight = "422px";
  let fitHeight = "360px";
  let waistcoatHeight = "210px";
  let trousersHeight = "212px";
  let selectHeight = "50px";
  if (window.matchMedia && window.matchMedia("(max-width: 415px)").matches) {
    fabricHeight = "378px";
    fitHeight = "324px";
    waistcoatHeight = "180px";
    trousersHeight = "210px";
    selectHeight = "50px";
  }
  if (window.matchMedia && window.matchMedia("(max-width: 380px)").matches) {
    fabricHeight = "336px";
    fitHeight = "288px";
    waistcoatHeight = "180px";
    trousersHeight = "212px";
    selectHeight = "50px";
  }
  if (window.matchMedia && window.matchMedia("(max-width: 321px)").matches) {
    fabricHeight = "282px";
    fitHeight = "240px";
    waistcoatHeight = "180px";
    trousersHeight = "212px";
    selectHeight = "50px";
  }

  // hàm thay đổi ảnh sản phẩm khi click vào loại vải
  let urlImage = "vest-1";
  function changeImageProductOfFabric() {
    $(".select-fabric__item").click(function () {
      urlImage = this.dataset.vest;
      $("#product__image .image img").attr(
        "src",
        `assets/image/product_feature/vest/${urlImage}/fit-1.jpg`
      );
      saveDateProductDesign();
    });
  }
  changeImageProductOfFabric();
  // hàm thay đổi ảnh sản phẩm khi click vào fit
  function changeImageProductOfFit() {
    $(".select-fit__item").click(function () {
      const urlFit = this.dataset.fit;
      $("#product__image .image img").attr(
        "src",
        `assets/image/product_feature/vest/${urlImage}/${urlFit}.jpg`
      );
      saveDateProductDesign();
    });
  }
  changeImageProductOfFit();
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
        } else if ($(this).hasClass("select-waistcoat__title")) {
          $(this).next().css("height", `${waistcoatHeight}`);
        } else if ($(this).hasClass("select-trousers__title")) {
          $(this).next().css("height", `${trousersHeight}`);
        } else {
          $(this).next().css("height", `${selectHeight}`);
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
}
//hàm kiểm tra trạng thái check ở input nếu người dùng chọn rồi thì hiển thị answer dấu tích

function checkedInput() {
  $("input").click(function () {
    if (this.checked) {
      $(this).parent().parent().parent().prev()[0].lastElementChild.style =
        "background-position: right -20px";
    } else {
      $(this).parent().parent().parent().prev()[0].lastElementChild.style =
        "background-position: right 0px";
    }
  });
}
checkedInput();

//  hàm kiểm tra người dùng chon size hau chưa

(function checkChooseSize() {
  $("select").click(function () {
    //  }
    if (
      $("select")[0].value != "default" &&
      $("select")[1].value != "default"
    ) {
      $(".select-size .answer").css("backgroundPosition", " right -20px");
    } else {
      $(".select-size .answer").css("backgroundPosition", " right 0px");
    }
    saveDateProductDesign();
  });
})();
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
      name_product: "BỘ VEST RIÊNG",
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
