
var apis = {
    allCategories: function () { // Get all Categories
        return new Promise((resolve, reject) => {
            $.get("https://us-central1-govr-42c7d.cloudfunctions.net/api/categories/all",
                function (data) {
                    resolve(data)
                }
            ).fail(function () {
                reject(false)
            })
        });
    },
    getNewestContent: function () { // Get all contents order by newest 
        return new Promise((resolve, reject) => {
            $.get(
                "https://us-central1-govr-42c7d.cloudfunctions.net/api/contents/newest?lim=20&desc=true",
                function (data) {
                    resolve(data)
                }
            ).fail(function () {
                reject(false)
            })
        })
    },
    getContentByCategory: function (category) { // Get all contents in single category page
        return new Promise((resolve, reject) => {
            $.get(
                `https://us-central1-govr-42c7d.cloudfunctions.net/api/contents/bycategory?lim=20&desc=true&cat=${category}`,
                function (data) {
                    resolve(data)
                }
            ).fail(() => {
                reject(false)
            })
        })
    },
    getContentById: (id) => { // Get single content by content id
        return new Promise((resolve, reject) => {
            $.get(
                `https://us-central1-govr-42c7d.cloudfunctions.net/api/contents?id=${id}`,
                function (data) {
                    resolve(data)
                }
            ).fail(() => {
                reject(false)
            })
        })
    },
    registerUser: function (user, userInfo) { // Create user
        return new Promise((resolve, reject) => {
            $.post(
                "https://us-central1-govr-42c7d.cloudfunctions.net/api/users/register", { u: user, uinfo: userInfo },
                function (data) {
                    resolve(data)
                }
            ).fail(function (error) {
                reject(error)
            })
        })
    },
    getUserInfo: function (uid) { // Get logged in user infomation 
        return new Promise((resolve, reject) => {
            $.get(
                `https://us-central1-govr-42c7d.cloudfunctions.net/api/userinfo?uid=${uid}`,
                function (data) {
                    resolve(data)
                }
            ).fail(function (error) {
                reject(error)
            })
        })
    },
    getUser: function (uid) { // Get logged in user detail 
        return new Promise((resolve, reject) => {
            $.get(
                `https://us-central1-govr-42c7d.cloudfunctions.net/api/users?uid=${uid}`,
                function (data) {
                    resolve(data)
                }
            ).fail(function (error) {
                reject(error)
            })
        })
    },
    getCategoryByLabel: function (label) {
        return new Promise((resolve, reject) => {
            $.get(
                `https://us-central1-govr-42c7d.cloudfunctions.net/api/categories/bylabel?label=${label}`,
                function (data) {
                    resolve(data)
                }
            ).fail((e) => {
                reject(e)
            })
        })
    }

}
