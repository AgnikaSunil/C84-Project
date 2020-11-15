import firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
  apiKey: "AIzaSyB-j_-5kA7VysCKT6xhJvx91Bo5KETTUsc",
  authDomain: "c77-project.firebaseapp.com",
  databaseURL: "https://c77-project.firebaseio.com",
  projectId: "c77-project",
  storageBucket: "c77-project.appspot.com",
  messagingSenderId: "990102302108",
  appId: "1:990102302108:web:0cfaa04024c482e5beec59"
};

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
