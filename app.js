// packages AKA dependencies
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var path 	   = require('path');
var session = require('express-session');

var EmailList   = require('./app/models/emailList.js');


app.use(bodyParser());
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, './app/views'));
app.use(express.static(__dirname + '/app/public'));

app.use(session({
  secret: 'daylite',
  resave: false,
  saveUninitialized: true
}))


var router = express.Router(); 

require( './app/routes' )( router, EmailList );

// Register router, to prefix all routes w/ '/api' use: app.use('/api', router);
app.use(router);

mongoose.connect('mongodb://tyler:daylite@novus.modulusmongo.net:27017/vesuh6yD');

var port = process.env.PORT || 8008;
app.listen(port);
console.log('now serving on port ' + port);