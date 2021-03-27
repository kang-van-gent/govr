// Able to change language
// Update problem
// Moblie responsive
// Able to update thumbnail
// Display map
// Able to change location
// Check user is logged in



const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')


// let data = {
//     title: "",
//     description: "",
//     category: "",
//   };
var app = new Vue({
    el: "#app",
    data: {
        title: '',
        description: '',
        category: '',
        content: {},
        categories: [],
        cat: '',
        auth: {},
        place: {}

    },
    methods: {
        back: function () {
            window.location.href = PAGES.MYPROFILE;
        },
        setContent: async (title, des, cat) => {
            try {
                this.title = title;
                this.description = des;
                this.category = cat;

                uploadContent()
            } catch (err) {
                console.log(err.message);
            }
        },
    },
});

var tab = new Vue({
    el : '#tab',
    data: {
        title : ''
    }
})

init()
async function init() {
    app.auth = await JSON.parse(localStorage.getItem(DB.AUTH));
    ContentById(id)
}

initData();
function initData() {
    apis.allCategories().then(data => {
        app.categories = data
    })    
}



async function uploadContent() {

    let pg = document.getElementById("progress");
    pg.setAttribute("style", "width:0%");
    console.log("uploading ...");
    try {
        // await contentsRef.doc(id)
        // .update(data)
        //     .then(() => {
        //         setTimeout(() => {
        //             pg.setAttribute("style", "width: 100%");
        //         }, 1000)
        //         setTimeout(() => {
        //             window.location.reload();
        //         }, 2000);
        //     })
            
        apis.updateContent(app.data.content).then(con =>{
            app.data.content = con
            console.log(con)
            setTimeout(() => {
                pg.setAttribute("style", "width: 100%");
            }, 1000)
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
        tab.title = con.title

    }).catch(error => {
        this.isLoading = false
        this.isError = true
        this.error = error
    });
}



var modal = document.getElementById("myModal3");
var btn = document.getElementById("myBtn");
// btn.onclick = function () {
//     modal.style.display = "block";
// };


