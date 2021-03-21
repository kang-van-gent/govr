const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

let user = JSON.parse(localStorage.getItem(DB.AUTH));
console.log(user);

let data = {
    title: "",
    description: "",
    category: "",
  };
var app = new Vue({
    el: "#app",
    data: {
        title: '',
        description: '',
        category: '',
        content: {},
        categories: [],
        cat: ''
    },
    methods: {
        toHome: function () {
            window.location.href = PAGES.INDEX;
        },
        setContent: async (title, des, cat) => {
            try {
                data.title = title;
                data.description = des;
                data.category = cat;
                data.published = true;
                uploadContent()
            } catch (err) {
                console.log(err.message);
            }
        },
    },
});
ContentById(id)
initData();
function initData() {
    $.get(
        "https://us-central1-govr-42c7d.cloudfunctions.net/api/categories/all",
        function (data) {
            app.categories = data
        }
    );
}



async function uploadContent() {

    let pg = document.getElementById("progress");
    pg.setAttribute("style", "width:0%");
    console.log("uploading ...");
    try {
        await contentsRef.doc(id)
        .update(data)
            .then(() => {
                setTimeout(() => {
                    pg.setAttribute("style", "width: 100%");
                }, 1000)
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            
        console.log('success')
    } catch (e) {
        console.log(data)
        console.log(e.message)
    }

}

function ContentById(id) {
    this.isLoading = true
    apis.getContent(id).then(con => {
        this.isLoading = false
        this.isError = false
        console.log(con)
        app.content = con
        app.cat = con.category

    }).catch(error => {
        this.isLoading = false
        this.isError = true
        this.error = error
    });
}



var modal = document.getElementById("myModal3");
var btn = document.getElementById("myBtn");
btn.onclick = function () {
    modal.style.display = "block";
};


