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
	var authE = false;
	var descE = false;
	var lengE = false;
	console.log("req.body.author:", req.body.author);
	if(req.body.author == null){
		authE = true;
	}

	if(req.body.description == null){
		descE = true;
	}

	if(req.body.length == null){
		lengE = true;
	}

	if(authE && descE && lengE){
		console.log("1");
		coursesRef.doc(`${req.body.course_id}`).set({
			course_id: req.body.course_id, 
			date_created: req.body.date_created, 
			name: req.body.name,
			body: req.body.body
		});
	} else if (authE && descE && (!lengE)){
		console.log("2");
		coursesRef.doc(`${req.body.course_id}`).set({
			course_id: req.body.course_id, 
			date_created: req.body.date_created, 
			length: req.body.length,
			name: req.body.name,
			body: req.body.body
		});
	} else if (authE && (!descE) && lengE){
		console.log("3");
		coursesRef.doc(`${req.body.course_id}`).set({
			course_id: req.body.course_id, 
			date_created: req.body.date_created, 
			description: req.body.description,
			name: req.body.name,
			body: req.body.body
		});
	} else if (authE && (!descE) && (!lengE)){
		console.log("4");
		coursesRef.doc(`${req.body.course_id}`).set({
			course_id: req.body.course_id, 
			date_created: req.body.date_created, 
			description: req.body.description,
			length: req.body.length,
			name: req.body.name,
			body: req.body.body
		});
	} else if ((!authE) && descE && lengE){
		console.log("5");
		coursesRef.doc(`${req.body.course_id}`).set({
			course_id: req.body.course_id, 
			author: req.body.author, 
			date_created: req.body.date_created, 
			name: req.body.name,
			body: req.body.body
		});
	} else if ((!authE) && descE && (!lengE)){
		console.log("6");
		coursesRef.doc(`${req.body.course_id}`).set({
			course_id: req.body.course_id, 
			author: req.body.author, 
			date_created: req.body.date_created, 
			length: req.body.length,
			name: req.body.name,
			body: req.body.body
		});
	} else if ((!authE) && (!descE) && lengE){
		console.log("7");
		coursesRef.doc(`${req.body.course_id}`).set({
			course_id: req.body.course_id, 
			author: req.body.author, 
			date_created: req.body.date_created, 
			description: req.body.description,
			name: req.body.name,
			body: req.body.body
		});
	} else if ((!authE) && (!descE) && (!lengE)){
		console.log("8");
		coursesRef.doc(`${req.body.course_id}`).set({
			course_id: req.body.course_id, 
			author: req.body.author, 
			date_created: req.body.date_created, 
			description: req.body.description,
			length: req.body.length,
			name: req.body.name,
			body: req.body.body
		});
	}

	res.send("success");
});

router.route("/createq").get((req, res) => {
	console.log("req.params", req.params);
	coursesRef.doc(`${req.body.course_id}`).set({
		course_id: req.params.course_id, 
		author: req.params.author, 
		date_created: req.params.date_created, 
		description: req.params.description,
		length: req.params.length,
		name: req.params.name,
		body: req.params.body
	});

	res.send("success");
})

module.exports = router;