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
    onFileChange() {
      if (this.files && this.files[0]) {
        var reader = new FileReader();

        reader.onload = (e) => {
          this.image360 = e.target.result;
        };
        reader.toDataURL(this.files[0]);
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
