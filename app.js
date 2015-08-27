/**
 * Global Variables
 */
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

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

/**
 * POST forms and
 * Adding content to DB
 * Action '/'
 * targeting the Accademic Affairs Modal
 */
app.post('/', function( req, res, next ) {
	// check if everything went throu
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
		if ( err ) {
			console.log(err);
		} else { 
			// print arguments in case they exist
			for ( var i = 0; i < arguments.length; i++ ) {
				console.log('Arguments' + i, arguments[i]);
			}
			// print the object to the console
			console.log('The object is: ' + obj);
			if(err) {
				// if there's an error, send the user back to Index
				console.log(err);
				res.render('index');
			} else {
				// in case there's no error, render reviewAccademicForm and pass the object
				res.render('lastReview/reviewAccademicForm', {studentData: obj});
			}

		}
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
		comments: req.body.stdComment
	}

	// create a new product obtained from the data
	var studentDataModal_two = new StudentRequest(data_secondModal);

	// handle the save method
	studentDataModal_two.save(function(err, obj) {
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
			res.render('printFormModal_two', {studentDataModal_two: obj});
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