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
    create: async (title, des, cat, img) => {
      try {
        let data = {
          uid: user.uid,
          image360: img,
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
        //await contentsRef.doc().set(data)
        console.log(data);
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
