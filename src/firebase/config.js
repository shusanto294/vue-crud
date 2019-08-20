import firebase from 'firebase/app'
import 'firebase/firestore'

// firebase init goes here
const config = {
  apiKey: "AIzaSyB23KrpCRQ_3GADD_PsG66y20k9LXScTyw",
  authDomain: "vue-crud-79126.firebaseapp.com",
  databaseURL: "https://vue-crud-79126.firebaseio.com",
  projectId: "vue-crud-79126",
  storageBucket: "vue-crud-79126.appspot.com",
  messagingSenderId: "120066946507",
  appId: "1:120066946507:web:0cc8a91704052127"
};

const firebaseApp = firebase.initializeApp(config)
export default firebaseApp.firestore()