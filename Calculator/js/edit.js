// Able to change language
// Able to update thumbnail
// Able to change location

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
        place: {},
        query: '',
        isLoading: false,
        isError: false,
        error: ""

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

function initMap() {
    infowindow = new google.maps.InfoWindow();

    const example = {
        title: 'Dhurakij Pundit University',
        location: { lat: 13.8707137, lng: 100.5484985 }
    };
    map = new google.maps.Map(
        document.getElementById('googleMap'), 
        { center: example.location, zoom: 15 }
    );
    createMarker(example);
}

function searchPlace(query){
    service = new google.maps.places.PlacesService(map)

    const request = {
        query: query,
        fields: ['name', 'geometry'],
    };

    service.findPlaceFromQuery(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                const place = {
                    title: results[i].name,
                    location: results[i].geometry.location
                }
                console.log(place)
                createMarker(place);
            }
            map.setCenter(results[0].geometry.location);
        }
    });
}

function createMarker(place){
    app.query = place.title;
    app.content.place = place
    const marker = new google.maps.Marker({
        position: place.location,
        title: place.title,
        map: map,
    });
}

init()
async function init() {
    app.isLoading = true
    const auth = await JSON.parse(localStorage.getItem(DB.AUTH));
    app.auth = auth
    ContentById(id)
    // if(auth == null){
    //     window.location.href = PAGES.INDEX
    // }

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
            
        apis.updateContent(app.content).then(con =>{
            app.content = con
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
        app.isLoading = false
        app.isError = false
        console.log(con)
        app.content = con
        app.cat = con.category
        tab.title = con.title
        app.place = con.place
        // if(app.auth.uid !== con.uid){
        //     window.location.href = PAGES.MYPROFILE
        // }

    }).catch(error => {
        app.isLoading = false
        app.isError = true
        app.error = error
    });
}



var modal = document.getElementById("myModal3");
var btn = document.getElementById("myBtn");
// btn.onclick = function () {
//     modal.style.display = "block";
// };


