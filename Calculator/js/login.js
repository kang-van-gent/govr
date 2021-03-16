var app = new Vue({
  el: "#app",
  data: {
    username: "",
    email: "",
    password: "",
    userLoggedin: [],
    userData: []
  },
  methods: {
    login: function () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;

          localStorage.setItem(DB.AUTH, JSON.stringify(user));

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
    register: function () {
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
          localStorage.setItem(DB.AUTH, JSON.stringify(user));

          //Save user and userInfo to firebase
          //User
          let localUser = {
            displayName: username,
            email: user.email,
            photoURL: null,
            uid: user.uid,
          };
          localStorage.setItem(DB.USER, JSON.stringify(localUser))
          //UserInfo
          let userInfo = {
            uid : user.uid,
            address : '',
            address2 : '',
            town : '',
            province : '',
            country : '',
            postal_code : '',
            phone : '',
            fname : '',
            lname : '',
            type : '',
            limitUploads : 5
          }
          localStorage.setItem(DB.USERINFO , JSON.stringify(userInfo))

          await saveUser(localUser,userInfo)          //save user to firebase
          window.location.href = PAGES.INDEX;

        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    },
  },
});

function saveUser(user, userInfo) {
  $.post("https://us-central1-govr-42c7d.cloudfunctions.net/api/users/register", {u: user, uinfo: userInfo}, function (data) {
      console.log(data)
    }
  );
}


