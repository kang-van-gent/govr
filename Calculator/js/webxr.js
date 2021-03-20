const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

  //Get uer from local storage
  let auth = JSON.parse(localStorage.getItem(DB.AUTH));
  let user = JSON.parse(localStorage.getItem(DB.USER));

var app = new Vue({
  el: '#app',
  data: {
    content: {},
    date: '',
    cate: '',
    user: null,
    isLoading: false,
    isError: false,
    error: "",
    img360: ''
  }
})
var scene = new Vue({
  el: '#scene',
  data: {
    content: {}
  }
})
ContentById(id)


function intialApp(img360) {
  img360
    .getDownloadURL()
    .then((url) => {
      // This can be downloaded directly:
      var xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = (event) => {
        var blob = xhr.response;
      };
      xhr.open("GET", url);
      xhr.send();

      // Or inserted into an <img> element
      var img = document.getElementById("img360");
      img.setAttribute("src", url);
      this.isLoading = false
      this.img360 = url
      console.log("success");
    })
    .catch((error) => {
      // Handle any errors
      console.log(error.message);
    });
}


function ContentById(id) {
  this.isLoading = true
  apis.getContent(id).then(data => {
    this.isError = false
    app.cate = data.cat.title
    scene.content = data
    app.content = data
    app.date =new Date(data.date['_seconds']*1000)
    console.log(data.image360)
    var storage = firebase.storage();
    const img360 = storage.refFromURL(data.image360);    
    intialApp(img360)
  }).catch(error => {
    this.isLoading = false
    this.isError = true
    this.error = error
  });
}




