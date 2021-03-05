import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBdr9MQT-_lfD5s1vneXAIO1oG3M8LWDHk",
    authDomain: "cs130-project.firebaseapp.com",
    projectId: "cs130-project",
    storageBucket: "cs130-project.appspot.com",
    messagingSenderId: "670284860247",
    appId: "1:670284860247:web:8f1edb1e12fdee15820c12"
  };
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;