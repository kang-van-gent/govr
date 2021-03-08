(function ($) {
  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 150) {
      $(".nav-bar").addClass("nav-sticky");
    } else {
      $(".nav-bar").removeClass("nav-sticky");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });
})(jQuery);
let user = JSON.parse(localStorage.getItem(DB));


let category = localStorage.getItem("Category");

var app = new Vue({
  el: "#app",
  data: {
    contents: [],
    categories: [],
    name: "Hi from data",
    user: user,
    contentCat: [],
    category: category,
  },
  methods: {
    toLogin: function () {
      window.location.href = PAGES.LOGIN;
    },
    toRegister: function () {
      window.location.href = PAGES.REGISTER;
    },
    toHome: function () {
      window.location.href = PAGES.INDEX;
    },
    toProfile: function () {
      window.location.href = PAGES.MYPROFILE;
    },
    logout: () => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.removeItem(DB.USER);

          window.location.href = PAGES.INDEX;
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    getCat: (cat) => {
      localStorage.setItem("Category", cat);
      window.location.href = PAGES.CATEGORY;
    }
  },
});

initData();
function initData() {
  $.get(
    "https://us-central1-govr-42c7d.cloudfunctions.net/api/categories/all",
    function (data) {
      app.categories = data;
    }
  );

  $.get(
    "https://us-central1-govr-42c7d.cloudfunctions.net/api/contents/newest?lim=20&desc=true",
    function (data) {
      app.contents = data;
      //console.log(data)
    }
  );
  $.get(
    `https://us-central1-govr-42c7d.cloudfunctions.net/api/contents/bycategory?lim=20&desc=true&cat=${category}`,
    function (data) {
      app.contentCat = data;
      console.log(app.contentCat);
    }
  );
}
