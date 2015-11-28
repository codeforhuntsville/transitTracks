//Getting all dependencies
var express = require('express.io');
var app = express();
var mongoose = require('mongoose');

var http = require('http').Server(app)
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

//Setup DB
mongoose.connect('mongodb://' + process.env.MONGO_USERNAME + ':' + process.env.MONGO_PASSWORD + '@ds053164.mongolab.com:53164/hsvtransit');

var transitSchema = new mongoose.Schema({
	id: Number,
	long: Number,
	lat: Number,
	pass: String
});
var Transit = mongoose.model('Transit', transitSchema);
var allLocations = [];

app.set('port', (process.env.PORT || 5000));

//Setting directory structure
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use( bodyParser.urlencoded({extended: false }));
app.use( bodyParser.json());

//Setup socket.io
app.http().io();

app.get('/', function(req, res) {
	res.render('pages/index');
});

app.get('/test', function(req, res) {
    io.emit('location update', [34.73172, -86.58979]);
    res.send('Success');
});

//Adds account
app.post('/api/v1/account', function(req, res) {
	Transit.find({id: transitId}, function( err, transit ) {
		if( transit[0] ) {
			res.send('Account already created');
		} else {
			newTransit = new Transit( {id: transitId, lat: 0, long: 0, pass: process.env.PASS} ); 
			newTransit.save();
			res.send('Account created');
		}
	});
});

//Updates account
app.post('/api/v1/account/:id', function(req, res) {
	res.send('Hello world!');
});

//Reads account
app.get('/api/v1/account/:id', function(req, res) {
	res.send('Hello world!');
});

//Adds location
app.post('/api/v1/trolly/:id/location', function(req, res) {
	var transitId = req.params.id;
	Transit.find({id: transitId}, function( err, transit ) {
		//console.log('Finding if transit exists: id = ' + transitId + ": " + transit[0]);
		if( transit[0] ) {
			Transit.find({id: transitId}, function( err, transit ) {
				if( transit[0] ) {
					console.log('Recording location to DB: ' + transit[0].id);
					transit[0].id = req.params.id;
					transit[0].lat = req.body.lat;
					transit[0].long = req.body.lon;
					transit[0].save();
				} else {
					console.log('Invalid credentials in location update');
					res.send('Invalid credentials');
				}
			});
		} else {
			newTransit = new Transit( {id: transitId, long: req.body.lon, lat: req.body.lat, pass: "ok" } ); 
			newTransit.save();
			//console.log('New bus added');
		}
	});
	res.send('Location added');
});

//Reads location
app.get('/api/v1/trolly/:id/location', function(req, res) {
	res.send('Hello world!');
});

//Gets status of trollies
app.get('/api/v1/trollies', function(req, re) {
	res.send('Hello world!');
});

//Gets stops for a single trolley
app.get('/api/v1/trollies/:id/stops', function(req, res) {
	res.send('Hello world!');
});

var latLng = [];
var locations;
var latLongs = {};

var homeLatLng = [34.73689, -86.592192];

function findLocations() {
	//console.log('Updating current location');
	Transit.find({pass: "ok"},{id:1,lat:1,long:1,_id:0}, function(err, transit) {
		//console.log("Getting coords for " + transit.length)
		if( transit.length > 0 ) {
			allLocations = transit;
		} else {
			console.log('DB credentials supplied incorrect');
		}
	});
}

var interval = setInterval(function(){findLocations();},3000);

//Everything socket.io related
io.sockets.on('connection', function(socket) {
	socket.on('get location', function( data ) {
		//console.log('location update requested ');
		io.emit('location update', allLocations);
	});
    socket.on('disconnect', function() {
      console.log('User disconnected');
    });
});

http.listen(app.get('port'), function() {
	console.log('Node app is running on port ', app.get('port'));
	var d = new Date();
	console.log('Time: ', + d.getTime() + ', Day:' + d.getDay() + ', Hour:' + d.getHours());
});
