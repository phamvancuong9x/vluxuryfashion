let getElmIdLogin = document.querySelector("#login");
let getElmIdRegister = document.querySelector("#Register");
let elementClassBtn__login = document.querySelector(".btn__login");
let elementClassBtn__register = document.querySelector(".btn__register");
let elementClassBtn__bgColor = document.querySelector(".btn__bgColor");
let elementClassBtns = document.querySelectorAll(".btn");
let elementClassBtn__bgColors = document.querySelectorAll(".btn__bgColor");
let getElmIdLinkCovertHtmls = document.querySelectorAll(".link-convert-html");

let ElmNameInputs = document.querySelectorAll(".userName");
let getElmPasswordInputs = document.querySelectorAll(".password");
let getElmConfirmPasswordInput = document.querySelector("#confirmPassword");

// hàm hover cho nút Login
function hoverElmClassBtn__bgColor() {
  for (let i = 0; i < 2; i++) {
    elementClassBtns[i].onmouseover = function () {
      elementClassBtn__bgColors[i].style.left = "-100%";
    };
    elementClassBtns[i].onmouseout = function () {
      elementClassBtn__bgColors[i].style.left = "0";
    };
  }
}
//Hàm click để  đóng các thông báo lỗi;
let ElmNameError1s = document.querySelectorAll(".userName-error1");
let ElmNameError2s = document.querySelectorAll(".userName-error2");
let ElmNameError3 = document.querySelector(".userName-error3");
let ElmPasswordError1s = document.querySelectorAll(".password-error1");
let ElmPasswordError2s = document.querySelectorAll(".password-error2");
let ElmPasswordError3 = document.querySelector(".password-error3");
let ElmConfirmPasswordError1 = document.querySelector(
  ".confirm-password-error1"
);
let ElmConfirmPasswordError2 = document.querySelector(
  ".confirm-password-error2"
);

//
function closeNotify() {
  document.querySelector("body").addEventListener("click", function (e) {
    for (let i = 0; i < 2; i++) {
      ElmNameError1s[i].style.display = "none";
      ElmNameError2s[i].style.display = "none";
      ElmPasswordError1s[i].style.display = "none";
      ElmPasswordError2s[i].style.display = "none";
    }
    ElmNameError3.style.display = "none";
    ElmPasswordError3.style.display = "none";
    ElmConfirmPasswordError1.style.display = "none";
    ElmConfirmPasswordError2.style.display = "none";
    e.stopPropagation();
  });
  for (let i = 0; i < 2; i++) {
    elementClassBtns[i].addEventListener("click", function (e) {
      e.stopPropagation();
    });

    getElmIdLinkCovertHtmls[i].addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }
}
// Hàm kiểm tra xem người dùng nhập tên vào nếu chưa đúng thì hiện thông báo lỗi.

function checkUserName() {
  for (let i = 0; i < 2; i++) {
    elementClassBtns[i].addEventListener("click", function (even) {
      if (ElmNameInputs[i].value.length == 0) {
        even.preventDefault();
        console.log(ElmNameError1s[i]);
        ElmNameError1s[i].style.display = "block";
        setTimeout(function () {
          ElmNameError1s[i].style.display = "none";
        }, 7000);
      } else if (
        ElmNameInputs[i].value.length < 6 &&
        ElmNameInputs[i].value.length > 0
      ) {
        even.preventDefault();
        ElmNameError2s[i].style.display = "block";
        setTimeout(function () {
          ElmNameError2s[i].style.display = "none";
        }, 7000);
      }
    });
  }
}
// Hàm kiểm tra xem người dùng nhập mật khẩu vào nếu chưa đúng thì hiện thông báo lỗi.
function checkPassword() {
  for (let i = 0; i < 2; i++) {
    elementClassBtns[i].addEventListener("click", function (even) {
      if (getElmPasswordInputs[i].value.length == 0) {
        even.preventDefault();
        ElmPasswordError1s[i].style.display = "block";
        setTimeout(function () {
          ElmPasswordError1s[i].style.display = "none";
        }, 7000);
      } else if (
        getElmPasswordInputs[i].value.length < 6 &&
        getElmPasswordInputs[i].value.length > 0
      ) {
        even.preventDefault();
        ElmPasswordError2s[i].style.display = "block";
        setTimeout(function () {
          ElmPasswordError2s[i].style.display = "none";
        }, 7000);
      }
    });
  }
}
// Hàm kiểm tra xem người dùng nhập lại mật khẩu vào nếu chưa đúng thì hiện thông báo lỗi.
function checkConfirmPassword() {
  elementClassBtn__register.addEventListener("click", function (even) {
    if (getElmConfirmPasswordInput.value.length == 0) {
      even.preventDefault();
      ElmConfirmPasswordError1.style.display = "block";
      setTimeout(function () {
        ElmConfirmPasswordError1.style.display = "none";
      }, 7000);
    } else if (
      getElmPasswordInputs[1].value != getElmConfirmPasswordInput.value
    ) {
      even.preventDefault();
      ElmConfirmPasswordError2.style.display = "block";
      setTimeout(function () {
        ElmConfirmPasswordError2.style.display = "none";
      }, 7000);
    }
  });
}

// hàm hiển thị mật khẩu hoặc ẩn đi cho phần nhập mật khẩu
function changeViewIcon() {
  let viewOns = document.querySelectorAll(".view-icon");
  for (let i = 0; i < 2; i++) {
    viewOns[i].onclick = function () {
      if (viewOns[i].innerHTML.trim() == '<i class="far fa-eye-slash"></i>') {
        viewOns[i].innerHTML = '<i class="far fa-eye"></i>';
        getElmPasswordInputs[i].type = "text";
      } else {
        viewOns[i].innerHTML = '<i class="far fa-eye-slash"></i>';
        getElmPasswordInputs[i].type = "password";
      }
    };
  }
}
//// hàm hiển thị mật khẩu hoặc ẩn đi cho phần xác nhận lại mật khẩu
function changeViewIconConfirmPassword() {
  let getElmClassViewIconConfirm = document.querySelector(".view-icon-confirm");
  let getElmInputConfirmPassword = document.getElementById("confirmPassword");
  getElmClassViewIconConfirm.onclick = function () {
    if (
      getElmClassViewIconConfirm.innerHTML.trim() ==
      '<i class="far fa-eye-slash"></i>'
    ) {
      getElmClassViewIconConfirm.innerHTML = '<i class="far fa-eye"></i>';
      getElmInputConfirmPassword.type = "text";
    } else {
      getElmClassViewIconConfirm.innerHTML = '<i class="far fa-eye-slash"></i>';
      getElmInputConfirmPassword.type = "password";
    }
  };
}
// Hàm thay đổi HTML của trang login thành  register
let getElmTitle = document.querySelector("title");
let getElmClassCreateAccountLink = document.querySelector(
  ".create-account-link"
);
let getElmClassPagesLoginLink = document.querySelector(".pagesLogIn-link");
function toConvertRegister() {
  getElmClassCreateAccountLink.onclick = function () {
    getElmTitle.innerText = "Register";
    getElmIdLogin.style.display = "none";
    getElmIdRegister.style.display = "block";
  };
}
//Hàm thay đổi HTML của trang register thành trang login
function toConvertLogin() {
  getElmClassPagesLoginLink.onclick = function () {
    getElmTitle.innerText = "Log In";
    getElmIdLogin.style.display = "block";
    getElmIdRegister.style.display = "none";
  };
}
//Hàm kiểm tra thông tin người dùng nhập vào để đăng kí đúng hay sai;
let user_name = document.querySelectorAll(".input-userName>input")[1];
let password = document.querySelectorAll(".input-password>input")[1];
let confirmPassword = document.querySelector(".input-password-confirm>input");
// hàm check lại
function isCheckInfoRegister() {
  return (
    user_name.value.length >= 6 &&
    user_name.value.length < 32 &&
    password.value.length >= 6 &&
    password.value.length < 32 &&
    password.value == confirmPassword.value
  );
}
// hàm cho phép gửi dữ liệu nếu thông tin người dùng nhập vào đúng
function tosSendInfoRegister() {
  $(document).keypress(function (event) {
    const charCode = event.charCode ? event.charCode : event.which;
    if (charCode == "13" && $("#Register").css("display") == "block") {
      if (isCheckInfoRegister()) {
        setTimeout(function () {
          getElmTitle.innerText = "Log In";
          getElmIdLogin.style.display = "block";
          getElmIdRegister.style.display = "none";
          ElmNameInputs[0].value = ElmNameInputs[1].value;
          getElmPasswordInputs[0].value = getElmPasswordInputs[1].value;
        }, 300);
      }
    }
  });
  elementClassBtn__register.addEventListener("click", function (e) {
    if (isCheckInfoRegister()) {
      getElmTitle.innerText = "Log In";
      getElmIdLogin.style.display = "block";
      getElmIdRegister.style.display = "none";
      ElmNameInputs[0].value = ElmNameInputs[1].value;
      getElmPasswordInputs[0].value = getElmPasswordInputs[1].value;
    } else {
      e.preventDefault();
    }
  });
}
// goi ham
checkUserName();
checkPassword();
checkConfirmPassword();
closeNotify();
changeViewIcon();
changeViewIconConfirmPassword();
hoverElmClassBtn__bgColor();
tosSendInfoRegister();
toConvertLogin();
toConvertRegister();
// hàm lấy dữ liệu từ api
function getAccountApi() {
  $(document).keypress(function (event) {
    const charCode = event.charCode ? event.charCode : event.which;
    if (charCode == "13" && $("#login").css("display") == "block") {
      fetch("https://api-json-sever.herokuapp.com/api/Account")
        .then(function (response) {
          return response.json();
        })
        .then(checkAccountLogin);
    }
  });

  elementClassBtn__login.addEventListener("click", function (even) {
    fetch("https://api-json-sever.herokuapp.com/api/Account")
      .then(function (response) {
        return response.json();
      })
      .then(checkAccountLogin);
  });
}
function startLogin() {
  getAccountApi();
}
createAccount();
startLogin();
// callback thực hiên kiểm tra xem dữ liệu người dùng nhập vào với dữ liệu từ API để thực hiện đăng nhập
function checkAccountLogin(accounts) {
  // console.log(even);
  let ckeckNameAccount = accounts.filter(function (account) {
    if (account.name == ElmNameInputs[0].value) {
      return account;
    }
  });
  var promise = new Promise(function (resolve) {
    resolve(accounts);
  });
  promise
    .then(function () {
      let checkAccount = accounts.filter(function (account) {
        if (
          account.name == ElmNameInputs[0].value &&
          account.password == getElmPasswordInputs[0].value
        ) {
          return account;
        }
      });
      return checkAccount;
    })
    .then(function (ckeckAccount) {
      if (ckeckAccount.length != 0) {
        localStorage.setItem("id", `${ckeckAccount[0].id}`);
        localStorage.setItem("name", `${ElmNameInputs[0].value}`);
        localStorage.setItem("password", `${getElmPasswordInputs[0].value}`);
        localStorage.setItem("url", `${ckeckAccount[0].url}`);
        // $('.link-home-input')[0].href='index.html'
        window.location.replace("index.html");
      }
    });

  notifyErrorUsernameWithApi(ckeckNameAccount);
  let ckeckPassWordAccount = accounts.filter(function (account) {
    if (account.password == getElmPasswordInputs[0].value) {
      return account;
    }
  });
  notifyErrorPasswordWithApi(ckeckPassWordAccount);
}
// hàm hiện ra thông báo lỗi khi người dùng nhập sai username;
function notifyErrorUsernameWithApi(ckeckAccount) {
  if (ElmNameInputs[0].value.length < 6) {
    return;
  } else if (ckeckAccount.length == 0) {
    ElmNameError3.style.display = "flex";
    setTimeout(function () {
      ElmNameError3.style.display = "none";
    }, 7000);
  }
}
// hàm hiện ra thông báo lỗi khi người dùng nhập sai password;
function notifyErrorPasswordWithApi(ckeckPassWordAccount) {
  if (getElmPasswordInputs[0].value.length < 6) {
    return;
  } else if (ckeckPassWordAccount.length == 0) {
    ElmPasswordError3.style.display = "flex";
    setTimeout(function () {
      ElmPasswordError3.style.display = "none";
    }, 7000);
  }
}

// Ham gui du lieu dang nhap nguoi dung len json sever
function getValueAccountRegister() {
  return {
    name: ElmNameInputs[1].value,
    password: getElmPasswordInputs[1].value,
    cart: "[]",
  };
}
function postApiAccount() {
  if (isCheckInfoRegister()) {
    fetch("https://api-json-sever.herokuapp.com/api/Account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(getValueAccountRegister()),
    });
  }
}
// hàm gửi dữ liệu lên josonsever tạo account khi nguoi dung click hặc nấn enter
function createAccount() {
  $(document).keypress(function (event) {
    const charCode = event.charCode ? event.charCode : event.which;
    if (charCode == "13" && $("#Register").css("display") == "block") {
      postApiAccount();
    }
  });
  elementClassBtn__register.addEventListener("click", postApiAccount);
  // startLogin();
}
// hàm xóa dữ liệu của json_sever từ id1 tới id 2;
function deleteDataApi(id1, id2) {
  for (id1; id1 <= id2; id1++) {
    fetch(`https://api-json-sever.herokuapp.com/api/Account/${id1}`, {
      method: "DELETE",
    });
  }
}
// deleteDataApi(1, 50)
// deleteDataApi()
