
var expect  = require("chai").expect;
var chai = require('chai')
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

const should = require('should');

describe("Test the backend", function() {


  it("Tests /courses route", function() {

	const x = chai.request('http://localhost:4000')
		.get('/courses/1')
		.end(function(err, res) {
    		//console.log(err);
    		//console.log(res);
    		expect(1).to.equal(res['body']['course_id']);
    		expect(res['statusCode']).to.equal(200); //OK status code
    		expect(err).to.be.null;
    		//expect(res).to.have.status(200);
  		});

  });

  it("Tests /user route", function() {

	const x = chai.request('http://localhost:4000')
		.get('/user/irisgur')
		.end(function(err, res) {
    		//console.log(err);
    		//console.log(res);
    		expect(res['statusCode']).to.equal(200); //OK status code
    		
    		//Check if we have the correct user:
    		expect('irisgur3@gmail.com').to.equal(res['body']['email_address']); // expect user is in db

    		expect(err).to.be.null;
  		});
  });

  it("Tests /user route, advanced", function() {
  	const y = chai.request('http://localhost:4000')
		.get('/user/jasonhuan')
		.end(function(err, res) {
    		//console.log(err);
    		//console.log(res);
    		expect(res['statusCode']).to.equal(200); //OK status code
    		
    		//Check if we have the correct user:
    		expect('cryptography').to.equal(res['body']['saved_courses'][0]); // expect user is in db

    		expect(err).to.be.null;
  		});
	});

 

  it("Tests route when adding a new course", function() {

  	const m = chai.request('http://localhost:4000')
    	.post('/courses/create')
    	.type('application/json')
    	//.set('content-type', 'application/json')
    	.send({
    		course_id: 5,
    		body: '',
    		author: 'irisgur',
    		date_created: '3/1/21',
    		description: 'This is a cooking course',
    		length: '100 minutes',
    		name: 'cooking'
    	})
    	.end(function(err, res) {
    		//console.log(res)
    		//console.log(err)
    		expect(err).to.be.null;
    		expect(res).to.have.status(200);
    		
    	});
    });


    /* Now that this courses is created and successfully addded to the database,
     * we should be able to access it: */

    it("Tests route on the newly added course", function() {
    	const newcourse = chai.request('http://localhost:4000')
			.get('/courses/5')
			.end(function(err, res) {
    			//console.log(err);
    			//console.log(res);
    			expect(5).to.equal(res['body']['course_id']);
    			expect(res['statusCode']).to.equal(200); //OK status code
    			expect(5).to.equal(res['body']['course_id']);
    			expect(res['body']['name']).to.equal('cooking');
  			});
    
	
  });          

});
