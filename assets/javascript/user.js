const ElmDate = $("#date");
const ElmMonth = $("#month");
const ElmYear = $("#year");
const ElmBtnSave = $(".btn__save");
const ElmHeaderImage = $(".header__user-image>img");
const ElmSidebarImage = $(".sidebar__avatar-image>img");
const ElmInputEmail = $("#email");
const ElmInputPhone = $("#phone");
const ElmInputMale = $("#male");
const ElmInputFemale = $("#female");
const ElmInputGenderOther = $("#gender-other");
const ElmInputDate = $("#date");
const ElmInputMonth = $("#month");
const ElmInputYear = $("#year");
// hàm xử lý hiển thị ra ngày tháng năm để người dùng chọn
function logicTime(indexFirst, indexSecond, ElmSelectTime, nameTime) {
  let timeHtml = ``;
  if (nameTime) {
    timeHtml = `<option>${nameTime}</option>`;
  }
  if (indexFirst <= indexSecond) {
    for (let i = indexFirst; i <= indexSecond; i++) {
      timeHtml += `<option value="${i}">${i}</option>`;
    }
  } else {
    for (let i = indexFirst; i >= indexSecond; i--) {
      timeHtml += `<option value=${i}>${i}</option>`;
    }
  }
  ElmSelectTime.html(`${timeHtml}`);
}
logicTime(1, 31, ElmDate, "Ngày");
logicTime(1, 12, ElmMonth, "Tháng");
logicTime(2021, 1900, ElmYear, "Năm");
// hàm render têb từ localStore ra
function renderName() {
  $(".sidebar__user-name").text(`${localStorage.getItem("name")}`);
  $("#name")
    .text(`${localStorage.getItem("name")}`)
    .css("border", "none");
}
renderName();
// hàm render ảnh từ localStore ra
function renderImage() {
  let urlImage = localStorage.getItem("url");
  if (urlImage && urlImage != "undefined") {
    ElmHeaderImage.attr("src", `${urlImage}`);
    ElmSidebarImage.attr("src", `${urlImage}`);
    $(".change-avatar__image>img").attr("src", `${urlImage}`);
  }
}
renderImage();
// Hàm lấy ra và hiển dữ thông tin email,phone người dùng từ LocalStore
function renderInfoUser(elmInput, key) {
  let value = localStorage.getItem(key);
  if (value != null && value != "undefined") {
    elmInput.val(`${value}`);
  }
}
// lấy ra email
renderInfoUser(ElmInputEmail, "email");
// lấy ra số điên thoai
renderInfoUser(ElmInputPhone, "phone");
// hàm lấy ra và hiển thị thông tin giới tính
function renderGender() {
  let gender = localStorage.getItem("genderId");
  if (gender != null && gender != "undefined") {
    switch (+gender) {
      case 1:
        ElmInputMale.prop("checked", "true");
        break;
      case 2:
        ElmInputFemale.prop("checked", "true");
        break;
      case 3:
        ElmInputGenderOther.prop("checked", "true");
        break;
    }
  }
}
renderGender();
// hàm lấy và hiển thị thông tin ngày tháng năm của người dùng ra trình duyệt
function renderTime(inputId, key) {
  let data = +localStorage.getItem(key);
  if (typeof data == "number" && data != 0) {
    let lengthOption = inputId.children().length;
    // console.log(inputId.children())
    for (let i = 1; i < lengthOption; i++) {
      if (+inputId.children()[i].value == data) {
        inputId.children()[i].selected = "selected";
        return;
      }
    }
  }
}
renderTime(ElmInputDate, "date");
renderTime(ElmInputMonth, "month");
renderTime(ElmInputYear, "year");
// hien thi anh
var url_image_avatar = "";
function changeHandler(e) {
  e.stopPropagation();
  e.preventDefault();
  // FileList object.
  const files = e.target.files;
  const file = files[0];
  const fileReader = new FileReader();
  fileReader.onload = function (progressEvent) {
    let url = fileReader.result;
    // Something like: data:image/png;base64,iVBORw...Ym57Ad6m6uHj96js
    url_image_avatar = url;
    //
    let myImg = $(".change-avatar__image>img");
    myImg[0].src = url;
  };
  fileReader.readAsDataURL(file); // fileReader.result -> URL.
}
// hàm click vao nút lưu dể cập nhật thông tin (render hình ảnh ra trang wep luôn)
function saveData() {
  ElmBtnSave.click(function () {
    showModal(".modal");
    renderImageSave();
    SendUrlImage();
    updateInfoUser("#email", "email");
    updateInfoUser("#phone", "phone");
    updateGenderoUser();
    // hàm lưu ngày thang năm sinh người dùng vào localStorage
    updateInfoUser("#date", "date");
    updateInfoUser("#month", "month");
    updateInfoUser("#year", "year");
  });
}
// hàm lưu  dữ liệu  của người dùng vào localStore
function updateInfoUser(idInput, key) {
  let value = $(idInput).val().trim();
  if (value) {
    localStorage.setItem(key, `${value}`);
  }
}
// Hàm lưu thông tin giới tính người dùng vào localStorage
function updateGenderoUser() {
  ElmInputGenderOther.prop("checked");
  if (ElmInputMale.prop("checked")) {
    localStorage.setItem("genderId", 1);
  } else if (ElmInputFemale.prop("checked")) {
    localStorage.setItem("genderId", 2);
  } else if (ElmInputGenderOther.prop("checked")) {
    localStorage.setItem("genderId", 3);
  }
}
// // hàm thay đổi ảnh khác và lưu vào localStorage
function renderImageSave() {
  if (url_image_avatar) {
    localStorage.setItem("url", `${url_image_avatar}`);
    ElmHeaderImage[0].src = `${url_image_avatar}`;
    ElmSidebarImage[0].src = `${url_image_avatar}`;
  }
}
// hàm thay đổi hoặc thêm url ảnh trên jsonsever
function SendUrlImage() {
  const idAccount = localStorage.getItem("id");
  fetch(`https://api-json-sever.herokuapp.com/api/Account/${idAccount}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: `${url_image_avatar}` }),
  });
}
saveData();
// hàm hien modal
function showModal(classModal) {
  console.log("modal");
  $(classModal).css("display", "flex");
  setTimeout(function () {
    $(classModal).fadeOut();
  }, 2000);
}
// hàm thoát modal
function hideModal(classModal) {
  $(classModal).click(function () {
    $(classModal).fadeOut();
  });
}
hideModal(".modal");
