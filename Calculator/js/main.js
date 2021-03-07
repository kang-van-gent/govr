(function ($) {
    
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
            $('.nav-bar').addClass('nav-sticky');
        } else {
            $('.nav-bar').removeClass('nav-sticky');
        }
    });
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
})(jQuery);

let user = JSON.parse(localStorage.getItem(DB.USER))


var app = new Vue({
    el: '#app',
    data: {
        contents: DATA,
        categories: CATE,
        name: 'Hi from data',
        user: user
    },
    methods: {
        toLogin: function () {
            
            window.location.href = PAGES.LOGIN
                 
        },
        toRegister: function () {

            window.location.href = PAGES.REGISTER
        },
        toHome: function () {

            window.location.href = PAGES.MAIN
        },
        toProfile: function () {

            window.location.href = PAGES.MYPROFILE
        },
        logout: () => {
          firebase.auth().signOut()
          .then(()=>{
            localStorage.removeItem(DB.USER)

            window.location.href = PAGES.MAIN
          }).catch((err) => {
            console.log(err.message)
          })
        }
    }
})

console.log(user)
