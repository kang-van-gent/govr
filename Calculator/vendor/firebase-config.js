const firebaseConfig = {
    apiKey: "AIzaSyBdJYPHvhaFuT1i2DyAlnuNOdSWHZCcaj4",
    authDomain: "govr-42c7d.firebaseapp.com",
    projectId: "govr-42c7d",
    storageBucket: "govr-42c7d.appspot.com",
    messagingSenderId: "687841800798",
    appId: "1:687841800798:web:e4a5d4bd6c7d4ea1503acf",
    measurementId: "G-KQLN5KBHTM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const DB = {
    USER: 'USER'
}

const PAGES = {
    INDEX: "index.html",
    CALCULATOR: "calculator.html"
}