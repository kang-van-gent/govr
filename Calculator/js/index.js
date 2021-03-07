document.title = "My Calculator"

var app = new Vue({
    el: '#app',
    data: {
        title: 'My Calculator',
        email: '',
        password: ''
    },
    methods: {
        login: function () {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    localStorage.setItem(DB.USER, JSON.stringify(user))
                    //window.location.href = PAGES.CALCULATOR
                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });
        }
    }
})


$.get( 'https://us-central1-govr-42c7d.cloudfunctions.net/api/contents/newest?lim=20&desc=true&cat=travel', function( data ) {
  console.log(data)
});
