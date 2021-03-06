const express = require("express");
const firebase = require("firebase");
const router = express.Router();


const db = firebase.firestore();
const userRef = db.collection("user");


router.route("/").get(function (req, res) {
  console.log("testing");
});

router.route("/:username").get(function (req, res) {
  	userRef.get().then((snapshot) => {
		const data = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		//res.send(data);
		for(var i = 0; i < data.length; i++){
			if(data[i].username == req.params.username){
				res.send(data[i]);
				console.log("req.params.username:", req.params.username);
				console.log(`data[${i}]`, data[i]);
			}
		}
		
	});
});

router.route("/signup").post((req, res) => {
	console.log("req.body.username:", req.body.username);
	console.log("req.body.email_address", req.body.email_address);
	userRef.doc(`${req.body.username}`).set({
		email_address: req.body.email_address, numCourseCreated: 0, saved_courses: [], username: req.body.username
	});
});

module.exports = router;