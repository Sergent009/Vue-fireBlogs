import firebase from "firebase/app"
import "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6SuqfW0VVAL0ebonGkt6BxhlyfbvHIbE",
    authDomain: "vue-fireblogs-3cb61.firebaseapp.com",
    projectId: "vue-fireblogs-3cb61",
    storageBucket: "vue-fireblogs-3cb61.appspot.com",
    messagingSenderId: "290499958415",
    appId: "1:290499958415:web:390fdc1d594afc263582fa"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const timestamp = firebase.firestore.FieldValue.serverTimestamp

  export {timestamp}
  export default firebaseApp.firestore()