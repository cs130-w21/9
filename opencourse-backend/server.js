const firebase = require("firebase/app");
const auth = require("firebase/auth");
require("firebase/firestore");

var firebaseConfig = {
	apiKey: "AIzaSyBdr9MQT-_lfD5s1vneXAIO1oG3M8LWDHk",
	authDomain: "cs130-project.firebaseapp.com",
	projectId: "cs130-project",
	storageBucket: "cs130-project.appspot.com",
	messagingSenderId: "670284860247",
	appId: "1:670284860247:web:8f1edb1e12fdee15820c12"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

const courseRoute = require('./routes/course');
const userRoute = require('./routes/user');

app.use("/courses", courseRoute);
app.use("/user", userRoute);

const coursesRef = db.collection("course");

async function x(){
	await coursesRef.doc('course2').set({
		course_id: 1, name: "math", author: "jasonhuan", body: {}, description: "", date_created: "2/13/21"
	});
}

coursesRef.get().then((snapshot) => {
	const data = snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
	console.log("All data in 'courses' collection", data);
});

x();

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});

app.route("/").get((req, res) => {
	console.log("test1");

});
