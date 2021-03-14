const content = localStorage.getItem('Content')

var app = new Vue({
    el: '#app',
    data: {
        content: content
    }
})
