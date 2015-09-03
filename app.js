/**
 * Global Variables
 */
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

/**
 * Establish connection to Database
 * Database Name: itt-request-form
 * Database Collection: studentrequests
 */
mongoose.connect('mongodb://localhost/itt-request-form');

/**
 * Body Parser to help us to parse all the data
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/**
 * Define Form Schema
 * This Schema will receive all the data from the user
 */
var formSchema = {
	date: Date,
	std_name: String,
	std_ID: String,
	std_Email: String,
	std_phone: Number,
	std_degree: String,
	std_program: String,
	current_quarter: String,
	chairs_request: String,
	class_request: String,
	office_365:String,
	tech_request: String,
	lrc_request: String,
	std_service_tag:Number,
	comments: String
};

// create an instance of the schema
var StudentRequest = mongoose.model('StudentRequest', formSchema);


// setting up jade
app.set('view engine', 'jade');

// enable public folders
app.use(express.static('public'));

/**
 * Setting the Views
 */
app.get('/', function( req, res ) {
	res.render('index'); // index view
});

// render reviewAccademicForm view
app.get('/lastReview', function( req, res, err ) {
	if ( err ) {
		console.log(err);
	} else {
		res.render('/lastReview/reviewAccademicForm');		
	}
});

// render reviewTechSupportForm view
app.get('/lastReview', function( req, res, err ) {
	if ( err ) {
		console.log(err);
	} else {
		res.render('/lastReview/reviewTechSupportForm');
	}
});

/**
 * POST forms and
 * Adding content to DB
 * Action '/'
 * targeting the Accademic Affairs Modal
 */
app.post('/', function( req, res, next ) {
	// check if everything went through
	console.log('Body Parser: ' + req.bodyParser);

	// obtaining data from the user with the already defined schema
	var data = {
		date: req.body.pickDate,
		std_name: req.body.stdName,
		std_ID: req.body.stdId,
		std_Email: req.body.stdEmail,
		std_phone: req.body.stdPhone,
		std_degree: req.body.stdDegree,
		std_program: req.body.stdProgram,
		current_quarter: req.body.stdQuarter,
		chairs_request: req.body.stdChairs,
		class_request: req.body.stdTypeRequest,
		comments: req.body.stdComment,
		draft: true
	}

	// print the object into the console to make sure 
	// that the data exist
	console.log('data: ', data);

	// create a new product obtained from the data
	var studentData = new StudentRequest(data);

	// handle the save method
	studentData.save({draft:true}, function( err, obj) {

		// print arguments in case they exist
		for ( var i = 0; i < arguments.length; i++ ) {
			console.log('Arguments' + i, arguments[i]);
		}
		// if there's an error while printing form
		if ( err ) {
			// send user to index and print the error
			console.log(err);
			res.render('index');
		} else { 
			// print the object to the console
			console.log('The object is: ' + obj);
			
			// if there's no error, send user to printForm.jade 
			// and pass studentData as an object to 
			// retreive all the info from the DB
			res.render('lastReview/reviewAccademicForm', {studentData: obj});	
		}


		// create reusable transport method (opens pool of SMTP connections)
		var transporter = nodemailer.createTransport({
		    service: "Gmail",
		    tls: {
		    	rejectUnauthorized: false
		    },
		    auth: {
		        user: "SomeEmal@gmail.com",
		        pass: "mypasskey"
		    }
		});

		// information about the html file
		var student = "<b>Student:</b> ",
			studentid = "<b>Student ID:</b> ",
			studentEmail = "<b>Student Email:</b> ",
			studentPhone = "<b>Student Phone Number:</b> ",
			studentDegree = "<b>Student Phone Number:</b> ",
			studentProgram = "<b>Student Program:</b> ",
			studentQuarter = "<b>Request Service From:</b> ",
			requestServiceFrom = "<b>Request Service From:</b> ",
			typeOfRequest = "<b>Type of Request:</b> ",
			studentComment = "<b>Student Comment:</b> ";


		// setup e-mail data with unicode symbols
		var mailOptions = {
		    // from: "Fred Foo <foo@blurdybloop.com>", // sender address
		    to: "SomeEmail@gmail.com", // list of receivers
		    subject: "Accademic Affairs Request Form", // Subject line
		    // text: "", // plaintext body
		    html: "<p>" + student + req.body.stdName + "</p> <br/> <p>" + studentid + req.body.stdId + "</p> <br/> <p>" + studentEmail + req.body.stdEmail + "</p> <br/> <p>" + studentPhone + req.body.stdPhone + "</p> <br/> <p>" + studentDegree + req.body.stdDegree + "</p> <br/> <p>" + studentProgram + req.body.stdProgram + "</p> <br/> <p>" + studentQuarter + req.body.stdQuarter + "</p> <br/> <p>" + requestServiceFrom + req.body.stdChairs + "</p> <br/> <p>" + typeOfRequest + req.body.stdTypeRequest + "</p> <br/> <p>" + studentComment + req.body.stdComment + "</p> <br/>" // html body
		}

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        console.log(error);
		    }else{
		        console.log("Message sent: " + info.message);
		    }

		    // if you don't want to use this transport object anymore, uncomment following line
		    //smtpTransport.close(); // shut down the connection pool, no more messages
		});



	});
	
});

/**
 * Adding content from the second Modal to DB
 * once the user submit the data from the second Modal
 * the server will response rendering the second form
 */
app.post('/second-modal', function( req, res, next ) {

	// obtaining data from the user with the already defined schema
	var data_secondModal = {
		date: req.body.pickDate,
		std_name: req.body.stdName,
		std_ID: req.body.stdId,
		std_Email: req.body.stdEmail,
		std_phone: req.body.stdPhone,
		std_degree: req.body.stdDegree,
		std_program: req.body.stdProgram,
		office_365: req.body.office365,
		tech_request: req.body.technicalRequest,
		lrc_request: req.body.lrcRequest,
		std_service_tag: req.body.stdServiceTag,
		comments: req.body.stdComment,
		draft: true
	}

	// create a new product obtained from the data
	var studentDataModal_two = new StudentRequest(data_secondModal);

	// handle the save method
	studentDataModal_two.save({draft:true},function(err, obj) {
		// log the arguments that the user posted to check if they exist
		for( var i = 0; i < arguments.length; i++ ) {
			console.log("Arguments: " + i, arguments[i]);
		}
		// in case an error, print the error and render index again
		if( err ) {
			console.log(err);

			res.render('index');
		} else {
			console.log(obj);
			// if there's no error, send user to printForm.jade 
			// and pass studentData as an object to 
			// retreive all the info from the DB 
			res.render('lastReview/reviewTechSupportForm', {studentDataModal_two: obj});
		}
	});
});

/**
 * Review before Submit
 */
app.post('/reviewAccForm', function( req, res, next ) {

	// check if everything went true
	console.log(req.bodyParser);

	// obtaining data from the user with the already defined schema
	var data = {
		date: req.body.pickDate,
		std_name: req.body.stdName,
		std_ID: req.body.stdId,
		std_Email: req.body.stdEmail,
		std_phone: req.body.stdPhone,
		std_degree: req.body.stdDegree,
		std_program: req.body.stdProgram,
		current_quarter: req.body.stdQuarter,
		chairs_request: req.body.stdChairs,
		class_request: req.body.stdTypeRequest,
		comments: req.body.stdComment
	}

	

	// create a new product obtained from the data
	var studentData = new StudentRequest(data);
	
	// handle the save method
	studentData.save(function(err, obj) {
		// log the arguments that the user posted to check if they exist
		for( var i = 0; i < arguments.length; i++ ) {
			console.log("Arguments: " + i, arguments[i]);
		}
		// in case an error, print the error and render index again
		if( err ) {
			console.log(err);
			res.render('../index');
		} else {
			console.log(obj);
			// if there's no error, send user to printForm.jade 
			// and pass studentData as an object to 
			// retreive all the info from the DB
			res.render('../printForm', {studentData: obj});
		}
	});	
});



// listen into port 8080
app.listen(8080);
