const content = JSON.parse(localStorage.getItem(DB.CONTENT));
var img360 = imgRef.child(content.image360);

intialApp()

function intialApp() {
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

