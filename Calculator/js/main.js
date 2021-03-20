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
//Get uer from local storage
let user = JSON.parse(localStorage.getItem(DB.USER));
//Get category from local storage
let category = localStorage.getItem("Category");

var app = new Vue({
  el: "#app",
  data: {
    contents: [],
    categories: [],
    name: "Hi from data",
    user: user,
    contentCat: [],

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
    toUpload: function () {
      window.location.href = PAGES.UPLOAD;
    },
    toWebXR: function (content) {
      localStorage.setItem(DB.CONTENT, JSON.stringify(content))
      window.location.href = PAGES.WEBXR + `?id=${content.id}`;
      
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
<<<<<<< HEAD
      localStorage.setItem("Category", cat);
=======
      localStorage.setItem(DB.CATEGORY, cat);
>>>>>>> parent of 7b8849e (update-page-ui)
      window.location.href = PAGES.CATEGORY;
    }
  },
});

initData();
function initData() {
<<<<<<< HEAD
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
    }
  );
  $.get(
    `https://us-central1-govr-42c7d.cloudfunctions.net/api/contents/bycategory?lim=20&desc=true&cat=${category}`,
    function (data) {
      app.contentCat = data;
    }
  );
=======
  app.isLoading = true;

  apis.allCategories().then(data => {
    app.categories = data;
  }).catch(error => {
    app.isError = true;
    app.error = error
  });

  apis.getNewestContent().then(data => {
    app.contents = data;
    app.isLoading = false;
    app.isError = false;
  }).catch(error => {
    app.isLoading = false;
    app.isError = true;
    app.error = error
  });
>>>>>>> parent of 7b8849e (update-page-ui)
}
