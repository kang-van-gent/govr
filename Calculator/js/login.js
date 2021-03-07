if (localStorage.getItem("DB") == null) {
  localStorage.setItem("DB", "[]");
}

var app = new Vue({
  el: "#app",
  data: {
    username: "",
    email: "",
    password: "",
  },
  methods: {
    login: function () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(async (userCredential) => {
          // Signed in
          var user = userCredential.user;

          localStorage.setItem(DB.USER, JSON.stringify(user));

          window.location.href = PAGES.MAIN;
          // ...
          let data = (await usersRef.doc(user.uid).get()).data();
          console.log(data);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
        });
    },
    register: function () {
      const username = this.username;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(async (userCredential) => {
          // Signed in
          var user = userCredential.user;
          user.updateProfile({
            displayName: username,
          });
          const USER = JSON.parse(user.uid);
          localStorage.setItem(DB.USER, JSON.stringify(user));

          // ...
          let data = await usersRef.doc(user.uid).set({
            displayName: username,
            email: user.email,
            photoURL: null,
            uid: user.uid,
          });
          window.location.href = PAGES.MAIN;
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
          console.log(errorMessage);
        });
    },
  },
});
