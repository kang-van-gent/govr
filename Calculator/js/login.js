

var app = new Vue({
  el: "#app",
  data: {
    username: "",
    email: "",
    password: "",
    userLoggedin: []
  },
  methods: {
    login: function () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;

          localStorage.setItem(DB.USER, JSON.stringify(user));

          window.location.href = PAGES.INDEX;
          // ...
          let data = (await usersRef.doc(user.uid).get()).data();
          this.userLoggedin = user.uid
          console.log(data);
        })
        .catch((error) => {
          let errorMessage = error.message;
          console.log(errorMessage);
        });
    },
    register1: function () {
      const username = this.username;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          user.updateProfile({
            displayName: username,
          });
          //localStorage.setItem(DB.USER, JSON.stringify(user));

          // ...
          /*await usersRef.doc(user.uid).set({
            displayName: username,
            email: user.email,
            photoURL: null,
            uid: user.uid,
          });*/
          let data = {
            displayName: username,
            email: user.email,
            photoURL: null,
            uid: user.uid,
          };
          //window.location.href = PAGES.INDEX;
          console.log(data)
        })
        .catch((error) => {
          const errorMessage = error.message;
          // ..
          console.log(errorMessage);
        });
    },
    register: function () {
      const username = this.username;
       try{
         const data = {
           username : username,
           email: this.email,
           password: this.password
         }
         console.log(data)
       }catch(e){
         console.log(e.massage)
       }
          
         
        
    },
  },
});
