import firebase from 'firebase';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCYyOXcF4lzux4XPGsRGXSn0uObug6YgVw",
    authDomain: "whatsappweb-26780.firebaseapp.com",
    databaseURL: "https://whatsappweb-26780-default-rtdb.firebaseio.com",
    projectId: "whatsappweb-26780",
    storageBucket: "whatsappweb-26780.appspot.com",
    messagingSenderId: "217216327455",
    appId: "1:217216327455:web:ad82a0c2755b0a0dd5da2a",
    measurementId: "G-TJ43N1VD11"
  };


  const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

  const db =app.firestore();

  const auth= app.auth();

  const provider = new firebase.auth.GoogleAuthProvider();

  export {db,auth,provider};
