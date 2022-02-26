{
  // hàm thay đổi ảnh sản phẩm khi click vào loại vải
  let urlImage = "vest-1";
  function changeImageProductOfFabric() {
    $(".select-fabric__item").click(function () {
      urlImage = this.dataset.vest;
      $("#product__image .image img").attr(
        "src",
        `assets/image/product_feature/vest/${urlImage}/fit-1.jpg`
      );
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
          $(this).next().css("height", "422px");
        } else if ($(this).hasClass("select-fit__title")) {
          $(this).next().css("height", "360px");
        } else if ($(this).hasClass("select-waistcoat__title")) {
          $(this).next().css("height", "210px");
        } else if ($(this).hasClass("select-trousers__title")) {
          $(this).next().css("height", "212px");
        } else {
          $(this).next().css("height", "50px");
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
    console.log($("select")[0].value);

    //  }
    if (
      $("select")[0].value != "default" &&
      $("select")[1].value != "default"
    ) {
      $(".select-size .answer").css("backgroundPosition", " right -20px");
    } else {
      $(".select-size .answer").css("backgroundPosition", " right 0px");
    }
  });
})();
