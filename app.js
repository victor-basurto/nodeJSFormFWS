/**
 * Global Variables
 */
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

/**
 * Establish connection to the Database
 */
mongoose.connect('mongodb://localhost/itt-request-form');

/**
 * Body Parser to help us to parse all the data
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
/**
 * Define Form Schema
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
	comments: String
};

// create an instance of the schema
var StudentRequest = mongoose.model('StudentRequest', formSchema);


// setup jade
app.set('view engine', 'jade');

// enable public folders
app.use(express.static('public'));

/**
 * Setting the Views
 */
// index view
app.get('/', function( req, res ) {
	res.render('index');
});

// finalReview view
// app.get('/', function( req, res ) {
// 	// find and grab data from DB
// 	StudentRequest.find(function(err, doc) {
// 		// render the finalReview
// 		console.log('Doc: ', doc);
// 		if( err ) {
// 			console.log(err);
// 		}
// 		res.render('printForm', {studentDatas: doc});
// 	});
// });

/**
 * Adding content to DB
 */
app.post('/', function( req, res, next ) {
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
	
	studentData.save(function(err, obj) {
		for( var i = 0; i < arguments.length; i++ ) {
			console.log("Arguments: " + i, arguments[i]);
		}
		if( err ) {
			console.log(err);
			res.render('index');
		} else {
			console.log(obj);
			// res.render('printForm');

			res.render('printForm', {studentData: obj});
		}
	});	
	
	
});

/**
 * creating the views
 */
// app.get('print/printForm', function( req, res ) {
// 	// rendering the new views
// 	res.render('/print/printForm');
// });



app.listen(8080);