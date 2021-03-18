const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

ContentById(id)

//var img360 = imgRef.child(content.image360);

var app = new Vue({
  el: '#app',
  data: {
    content360: []
  }
  
})



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
  apis.getContentById(id).then(data => {
    console.log(app.content360 = data)
    var img360 = imgRef.child(data.image360);
    intialApp(img360)
  })
}




