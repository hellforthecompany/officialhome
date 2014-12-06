// packages AKA dependencies
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var monSess    = require('mongoose-session');
var path 	     = require('path');
var session    = require('express-session');

// imports
var EmailList   = require('./app/models/emailList.js');
var User   = require('./app/models/user.js');
var Secret = require('./secret.js');

// app config
app.use(bodyParser());
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, './app/views'));
app.use(express.static(__dirname + '/app/public'));

// set up sessions
app.use(session({
  key: 'session',
  secret: Secret,
  resave: false,
  saveUninitialized: true,
  store: monSess(mongoose)
}))


// route section
var router = express.Router(); 

require( './app/routes' )( router, EmailList, User );

// Register router, to prefix all routes w/ '/api' use: app.use('/api', router);
app.use(router);

mongoose.connect('mongodb://tyler:daylite@novus.modulusmongo.net:27017/vesuh6yD');

var port = process.env.PORT || 8008;
app.listen(port);
console.log('now serving on port ' + port);