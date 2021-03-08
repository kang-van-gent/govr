let categories = localStorage.getItem('Category')
console.log(categories)

var app = new Vue({
    el: '#app',
    data: {
        cat : categories,
    }
})



