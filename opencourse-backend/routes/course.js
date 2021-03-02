const express = require("express");
const firebase = require("firebase");
const router = express.Router();


const db = firebase.firestore();
const coursesRef = db.collection("course");


router.route("/").get(function (req, res) {
  	coursesRef.get().then((snapshot) => {
		const data = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		res.send(data);
	});
});

router.route("/:id").get(function (req, res) {
  	coursesRef.get().then((snapshot) => {
		const data = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

		//res.send(data);
		for(var i = 0; i < data.length; i++){
			if(data[i].course_id == req.params.id){
				res.send(data[i]);
				console.log("req.params.id:", req.params.id);
				console.log(`data[${i}]`, data[i]);
			}
		}
		
		//console.log("All data in 'courses' collection", data);
	});
});

router.route("/create").post((req, res) => {
	console.log("req.body", req.body);
	coursesRef.doc(`${req.body.course_id}`).set({
		course_id: req.body.course_id, 
		author: req.body.author, 
		date_created: req.body.date_created, 
		description: req.body.description,
		length: req.body.length,
		name: req.body.name,
		body: req.body.body
	});
	res.status(200).send("Request successful");
})

module.exports = router;