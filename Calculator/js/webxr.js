const content = JSON.parse(localStorage.getItem("Content"));
var img360 = imgRef.child('wcGVO942o2Ol92ljAJyxImzAwfp2-2021-2-14-18-42-23.jpg');

intialApp()

//var img360 = imgRef.child(content.image360);

//var img360 = imgRef.child(content.image360);

var app = new Vue({
  el: '#app',
  data: {
    content: {},
    date: '',
    cate: '',
    user: null,
    isLoading: false,
    isError: false,
    error: ""
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
    this.isLoading = false
    this.isError = false

    app.content = data
    app.cate = data.cat.title
    //console.log( app.date =new Date(data.date['_seconds']*1000))
    //const img360 = imgRef.child(data.image360);
    //intialApp(img360)
  }).catch(error => {
    this.isLoading = false
    this.isError = true
    this.error = error
  });
}




