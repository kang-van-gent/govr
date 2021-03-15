let user = JSON.parse(localStorage.getItem(DB.USER));

var app = new Vue({
  el: "#app",
  data: {
    title: "",
    description: "",
    category: "",
    categories: [],
    image360: "",
  },
  methods: {
    toHome: function () {
      window.location.href = PAGES.INDEX;
    },
    create: async (title, des, cat) => {
      try {
        let data = {
          uid: user.uid,
          image360: name,
          location: [],
          title: title,
          description: des,
          category: cat,
          date: new Date(),
          private: false,
          published: true,
          disabled: false,
          thumbnail: "",
        };
        let i = Dropzone.forElement("#demo-upload");
        var message = i.files[0].dataURL;
        const arr = message.split('data:image/jpeg;base64,')
        let name = fileName(data.uid)
        let ref = imgRef.child(name)
        await ref.putString(arr[1], "base64").then((snapshot) => {
          console.log(name);
        });
        await contentsRef.doc().set(data)
      } catch (err) {
        console.log(err.message);
      }
      
    },
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
}
console.log(user);

function fileName(uid) {
  let date = new Date();
  let name = uid+'-'+ date.getFullYear() +'-'+ date.getMonth() +'-'+ date.getDate() +'-'+ date.getHours() +'-'+ date.getMinutes() +'-'+ date.getSeconds() +'.jpg'
  return name
}

// Get the modal
var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");
var modal3 = document.getElementById("myModal3");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var back = document.getElementsByClassName("back")[0];
var back2 = document.getElementsByClassName("back2")[0];
var con = document.getElementsByClassName("continue")[0];
var con2 = document.getElementsByClassName("continue2")[0];

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close2")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
span2.onclick = function() {
  modal2.style.display = "none";
}
back.onclick = function() {
  modal.style.display = "none";
}
con.onclick = function() {
  modal.style.display = "none";
  modal2.style.display = "block"
}
back2.onclick = function() {
  modal.style.display = "block";
  modal2.style.display = "none"
}
con2.onclick = function() {
  modal2.style.display = "none"
  modal3.style.display = "block"
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == modal3) {
    modal3.style.display = "none";
  }
}

