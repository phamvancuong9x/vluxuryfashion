{
  const getNavInputSearch = $("#nav__input-search");
  const getNavlinkSearch = $(".nav__link-search");
  const getElmHeaderImage = $(".header__user-image>img");
  const elmMainSlider = $(".main__slider");
  const elmHeader = $("header");
  const elmNav = $("nav");

  // hàm login log-in
  function logIn() {
    const UrlImage = localStorage.getItem("url");
    $(".nav__header-user").css("display", "none");
    $(".header__user").css("display", "block");
    $(".header__user-name")
      .text(localStorage.getItem("name"))
      .css("color", "#000")
      .css("text-transform", "capitalize");
    if (UrlImage && UrlImage != "undefined") {
      getElmHeaderImage.attr("src", `${UrlImage}`);
      $(".header-mobile__user-info img").attr(
        "src",
        `${localStorage.getItem("url")}`
      );
    }
  }
  function checkLogin() {
    fetch("https://api-json-sever.herokuapp.com/api/Account")
      .then(function (response) {
        return response.json();
      })
      .then(function (accounts) {
        let arrayAccount = accounts.filter(function (account) {
          if (
            account.name == localStorage.getItem("name") &&
            account.password == localStorage.getItem("password")
          ) {
            return account;
          }
        });
        if (arrayAccount.length != 0) {
          if (arrayAccount[0].url) {
            $(".header__user-image>img")[0].src = arrayAccount[0].url;
          }
          localStorage.setItem("url", arrayAccount[0].url);
          $(".nav__header-user").css("display", "none");
          $(".header__user").css("display", "block");
          $(".header__user-name")
            .text(localStorage.getItem("name"))
            .css("color", "#000")
            .css("text-transform", "capitalize");
        }
      });
  }
  function login() {
    if (localStorage.getItem("name") != null) {
      logIn();
    } else {
      checkLogin();
    }
  }
  login();
  let keyLocalStorage = ["id", "name", "password", "url"];
  function logOut() {
    $(".header__user-logout").click(function () {
      $(".nav__header-user").css("display", "block");
      $(".header__user").css("display", "none");
      for (let i = 0; i < keyLocalStorage.length; i++) {
        localStorage.removeItem(`${keyLocalStorage[i]}`);
      }
    });
  }
  logOut();

  $(document).ready(function () {
    $("input[type='image']").click(function () {
      $("input[id='files']").click();
    });
  });

  //  hàm xly tabs truyên vào 4 tham số
  // tabLists: clas chung của tab,tabDescribes:class chung của nội dung các tab cần hiển thị
  // tabId: id của tab cần click vào ,tabDescribeID :id nội dung của tab click vào cần hiện thị
  function link(tabLists, tabDescribes, tabId, tabDescribeID) {
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
          $(ElmTabContents[i]).css("opacity", "0").css("zIndex", "1");
          // $($(ElmTabContents[i]).children()[0]).slick("setPosition");
        } else {
          $(ElmTabContents[i]).css("opacity", "1").css("zIndex", "2");
          // $($(ElmTabContents[i]).children()[0]).slick("setPosition");
        }
      }
    });
  }
  link("featured-products__list", "tab-describe", "tab1", "tab1-content");
  link("featured-products__list", "tab-describe", "tab2", "tab2-content");
  link("featured-products__list", "tab-describe", "tab3", "tab3-content");

  // hàm date
  let isEventStart = false;
  let now = new Date(); // Lấy thời gian hiện tại
  let date = now.getDate(); // Lấy ngày từ thời gian hiện tại
  let month = now.getMonth() + 1; // Lấy tháng từ thời gian hiện tại. Do tháng trong javascript tính từ 0 - 11 nên phải +1
  let year = now.getFullYear();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  function timeCurrent() {
    now = new Date(); // Lấy thời gian hiện tại
    date = now.getDate(); // Lấy ngày từ thời gian hiện tại
    month = now.getMonth() + 1; // Lấy tháng từ thời gian hiện tại. Do tháng trong javascript tính từ 0 - 11 nên phải +1
    year = now.getFullYear();
    hours = now.getHours();
    minutes = now.getMinutes();
    seconds = now.getSeconds();
  }
  // hàm tạo constructor đối tượng thời gian sự kiện bắt đầu và kết thúc
  function timeEvent(
    secondsStart,
    minutesStart,
    hoursStart,
    dateStart,
    monthStart,
    yearStart,
    secondsEnd,
    minutesEnd,
    hoursEnd,
    dateEnd,
    monthEnd,
    yearEnd,
    secondsId,
    minutesId,
    hoursId,
    dateId
  ) {
    (this.secondsStart = secondsStart),
      (this.minutesStart = minutesStart),
      (this.hoursStart = hoursStart),
      (this.dateStart = dateStart),
      (this.monthStart = monthStart),
      (this.yearStart = yearStart),
      (this.secondsEnd = secondsEnd),
      (this.minutesEnd = minutesEnd),
      (this.hoursEnd = hoursEnd),
      (this.dateEnd = dateEnd),
      (this.monthEnd = monthEnd),
      (this.yearEnd = yearEnd),
      (this.secondsId = secondsId),
      (this.minutesId = minutesId),
      (this.hoursId = hoursId),
      (this.dateId = dateId);
  }

  let dataTime = new timeEvent(
    00,
    00,
    00,
    17,
    5,
    2022,
    00,
    00,
    24,
    20,
    5,
    2022,
    "banner__seconds",
    "banner__minutes",
    "banner__hours",
    "banner__date"
  );
  function renderTime(dataTime) {
    let timeSecond;
    let timeSeconds;
    // hiển thị ra thời gian bắt đầu và kết thúc sự kiện
    $(".banner__time-start").text(
      `Từ ${dataTime.dateStart}/${dataTime.monthStart} - ${dataTime.dateEnd}/${dataTime.monthEnd}`
    );

    // Kiểm tra sự kiện bắt đầu chưa,
    function delay(time) {
      return new Promise(function (resolve, reject) {
        setTimeout(resolve, time);
      });
    }

    delay(0)
      .then(function () {
        if (
          isCheckTimeEvent(
            dataTime.secondsStart,
            dataTime.minutesStart,
            dataTime.hoursStart,
            dataTime.dateStart,
            dataTime.monthStart,
            dataTime.yearStart
          )
        ) {
          timeSecond = timeEventTotal(
            dataTime.secondsStart,
            dataTime.minutesStart,
            dataTime.hoursStart,
            dataTime.dateStart,
            dataTime.monthStart,
            dataTime.yearStart
          );
          $(".banner__event-status").text("Bắt đầu sau");
          $(".banner__time-group ").css("display", "flex");
          showTimeScreen(dataTime, timeSecond);
          console.log(timeSecond * 1000 + 1000);
          return delay((timeSecond * 1000 + 1000) / 2);
          // chia nhỏ thời gian goi Promise delay vì thời gian lớn qua hàm setTime ko chạy
        }
      })
      .then(function () {
        return delay((timeSecond * 1000 + 1000) / 2);
      })
      .then(function () {
        // // kiểm tra thời gian diên ra sự kiện đã kết thúc chưa
        if (
          isCheckTimeEvent(
            dataTime.secondsEnd,
            dataTime.minutesEnd,
            dataTime.hoursEnd,
            dataTime.dateEnd,
            dataTime.monthEnd,
            dataTime.yearEnd
          )
        ) {
          // goi hàm tính tổng thời gian diễn ra sựu kiện
          timeSeconds = timeEventTotal(
            dataTime.secondsEnd,
            dataTime.minutesEnd,
            dataTime.hoursEnd,
            dataTime.dateEnd,
            dataTime.monthEnd,
            dataTime.yearEnd
          );
          // thay đổi trạng thái sự kiện và hiển thị bộ đêm thời gian sự kiên
          if ($(".banner__time-group ").css("display").trim() == "none") {
            $(".banner__time-group ").css("display", "flex");
          }
          // hiển thị thời gian sự kiên còn lại:
          showTimeScreen(dataTime, timeSeconds);
          $(".banner__event-status").text("Kết thúc sau");
          return delay((timeSeconds * 1000 + 1000) / 2);
        }
      })
      .then(function () {
        return delay((timeSeconds * 1000 + 1000) / 2);
      })
      .then(function () {
        showEvenEnd();
      });
  }

  renderTime(dataTime);

  // hàm trả về số ngày của 1 tháng trong 1 năm
  function isDateOfMonth(month, year) {
    if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
      if (month == 2) {
        return 29;
      }
    } else {
      if (month == 2) {
        return 28;
      }
    }
    switch (month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        return 31;
      default:
        return 30;
    }
  }
  // Hàm tính tổng thời gian đến hoặc diễn ra sự kiên
  function timeEventTotal(
    secondsTime,
    minutesTime,
    hoursTime,
    dateTime,
    monthTime,
    yearTime
  ) {
    timeCurrent();
    // tính số ngày diễn ra sự kiên nếu năm khác nhau
    let dateTotal = 0;
    let hoursTotal = 0;
    let minutesTotal = 0;
    let secondsTotal = 0;
    if (yearTime - year > 0) {
      dateTotal = isDateOfMonth(month, year) - date + dateTime;
      for (let i = month + 1; i <= 12; i++) {
        dateTotal += isDateOfMonth(i, year);
      }
      for (let j = year + 1; j < yearTime; j++) {
        dateTotal += isDateOfYear(j);
      }
      for (let k = 1; k < monthTime; k++) {
        dateTotal += isDateOfMonth(k);
      }
    }
    // tính số ngày diễn ra sự kiện nếu năm bằng nhau
    else if (yearTime - year == 0 && monthTime - month > 0) {
      dateTotal = isDateOfMonth(month, yearTime) - date + dateTime;
      for (let i = month + 1; i < monthTime; i++) {
        dateTotal += isDateOfMonth(i, yearTime);
      }
    } else if (yearTime - year == 0 && monthTime - month == 0) {
      dateTotal = dateTime - date;
    }
    // Tính tổng thời gian sự kiện còn lại theo giây:
    return (
      dateTotal * 24 * 3600 -
      hours * 3600 -
      minutes * 60 -
      seconds +
      hoursTime * 3600 +
      minutesTime * 60 +
      secondsTime
    );
  }
  // hàm hiển thị thời gian sắp diễn ra và kết thúc sự kiện lên màn hình

  function showTimeScreen(dataTime, timeSeconds) {
    let ElmDate = $(`#${dataTime.dateId}`);
    let ElmHours = $(`#${dataTime.hoursId}`);
    let ElmMinutes = $(`#${dataTime.minutesId}`);
    let ElmSeconds = $(`#${dataTime.secondsId}`);
    let dateShow = 0;
    let hoursShow = 0;
    let minutesShow = 0;
    let secondsShow = 0;
    //  hiển thị ra màn hình thời gian sự kiện
    const renderDataId = setInterval(function () {
      dateShow = Math.floor(timeSeconds / (24 * 3600));
      hoursShow = Math.floor((timeSeconds - dateShow * (24 * 3600)) / 3600);
      minutesShow = Math.floor(
        (timeSeconds - dateShow * (24 * 3600) - hoursShow * 3600) / 60
      );
      secondsShow = Math.floor(
        timeSeconds -
          dateShow * (24 * 3600) -
          hoursShow * 3600 -
          minutesShow * 60
      );
      ElmDate.text(`${dateShow}`);
      ElmHours.text(`${hoursShow}`);
      ElmMinutes.text(`${minutesShow}`);
      ElmSeconds.text(`${secondsShow}`);
      timeSeconds = timeSeconds - 1;
      if (timeSeconds <= 300) {
        console.log(1);
        setTimeout(function () {
          $(".banner__event-status").css("opacity", "0");
        }, 500);
        setTimeout(function () {
          $(".banner__event-status").css("opacity", "1");
        }, 800);
      }
      if (timeSeconds < 0) {
        clearInterval(renderDataId);
      }
    }, 1000);
  }

  // hàm trả về số ngày của 1 năm
  function isDateOfYear(year) {
    if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
      return 366;
    } else {
      return 365;
    }
  }
  //  kiểm tra thời gian diên ra sự kiện bắt đầu hay kết thúc chưa;
  function isCheckTimeEvent(
    secondsTime,
    minutesTime,
    hoursTime,
    dateTime,
    monthTime,
    yearTime
  ) {
    timeCurrent();
    let secondsTotalTimeCurrent = 0;
    let secondsTotalTimeEvent = 0;
    if (yearTime < year) {
      return false;
    } else if (yearTime == year) {
      if (monthTime < month) {
        return false;
      } else if (monthTime == month) {
        secondsTotalTimeCurrent =
          date * 24 * 3600 + hours * 3600 + minutes * 60 + seconds;
        secondsTotalTimeEvent =
          dateTime * 24 * 3600 +
          hoursTime * 3600 +
          minutesTime * 60 +
          secondsTime;
        if (secondsTotalTimeEvent - secondsTotalTimeCurrent > 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
  //  hàm hiện thị khi thời gian kết thúc
  function showEvenEnd() {
    $(".banner__event-status").text("Đã kết thúc").css("color", "red");
    if (window.matchMedia && window.matchMedia("(max-width: 479px)").matches) {
      $(".banner__time ").addClass("banner__time-js");
      $(".banner__time-start").css("marginRight", "4px");
    }
    $(".banner__time-group ").fadeOut();
  }

  // thay dổi hiệu ứng animate cho node có class=".banner__time-start"
  function changeAnimateBanner() {
    if (window.matchMedia && window.matchMedia("(max-width: 479px)").matches) {
      $(".banner__time-start")
        .removeClass("animate__fadeInRight")
        .addClass("animate__fadeInLeft");
    }
  }
  changeAnimateBanner();
  // hàm hover lên nút bắt đầu có class ='.bttn-start' đổi màu border radius img
  function hoverToChangeBorder() {
    $(".bttn-start").mouseover(function () {
      if (
        window.matchMedia &&
        window.matchMedia("(min-width: 576px)").matches
      ) {
        $(this)
          .parent()
          .prev()
          .css("borderColor", "#716969")
          .css("backgroundColor", "#fff");
      }
    });

    $(".bttn-start").mouseout(function () {
      if (
        window.matchMedia &&
        window.matchMedia("(min-width: 576px)").matches
      ) {
        $(this)
          .parent()
          .prev()
          .css("borderColor", "#b0adad")
          .css("backgroundColor", "transparent");
      }
    });
  }
  hoverToChangeBorder();

  // slider +wow.js

  const wow = new WOW({
    boxClass: "wow", // animated element css class (default is wow)
    animateClass: "animated", // animation css class (default is animated)
    offset: 0, // distance to the element when triggering the animation (default is 0)
    mobile: false, // trigger animations on mobile devices (default is true)
    live: true, // act on asynchronously loaded content (default is true)
    callback: function (box) {
      // the callback is fired every time an animation is started
      // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: null, // optional scroll container selector, otherwise use window,
    resetAnimation: true, // reset animation on end (default is true)
  });
  wow.init();

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
  tabSlider("#tab1-content .row");
  tabSlider("#tab2-content .row");
  tabSlider("#tab3-content .row");
  tabSlider(".famousPeoples .row");
}

// hàm chuyển đến trang chi tiết sản phẩm khi người dùng click và thêm params vào URL
function switchToPageDetailProduct() {
  $(".featured-products__item").click(function () {
    window.location.assign(
      `detailProduct.html?typeProduct=${this.dataset.typeProduct}&id=${this.dataset.id}`
    );
  });
}
switchToPageDetailProduct();
// hàm khởi động json sever

function startJsonSever() {
  let URL = `https://api-json-sever.herokuapp.com/api/categoryProduct`;
  fetch(URL).then((response) => response.json());
}
startJsonSever();
