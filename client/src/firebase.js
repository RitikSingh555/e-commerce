import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDWI-F-J8TeYhR4aIs_CR2HLpqqUAaZdw4",
    authDomain: "e-commerce-bd43d.firebaseapp.com",
    projectId: "e-commerce-bd43d",
    storageBucket: "e-commerce-bd43d.appspot.com",
    messagingSenderId: "468675347916",
    appId: "1:468675347916:web:637925980d57b40da0c969"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()