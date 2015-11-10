//Getting all dependencies
var express = require('express.io');
var app = express();
var mongoose = require('mongoose');

var http = require('http').Server(app)
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

//Setup DB
mongoose.connect('mongodb://' + process.env.MONGO_USERNAME + ':' + process.env.MONGO_PASSWORD + '.mongolab.com:53164/hsvtransit');

var transitSchema = new mongoose.Schema({
	id: Number,
	lat: Number,
	lng: Number,
	pass: String
});
var Transit = mongoose.model('Transit', transitSchema);

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

//Adds account
app.post('/api/v1/account', function(req, res) {
	Transit.find({id: transitId}, function( err, transit ) {
		if( transit[0] ) {
			res.send('Account already created');
		} else {
			newTransit = new Transit( {id: transitId, lat: 0, lng: 0, pass: process.env.PASS} ); 
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
		if( transit[0] ) {
			Transit.find({user: request.body.user, pass: request.body.pass}, function( err, transit ) {
				if( transit[0] ) {
					transit[0].lat = req.body.lat;
					transit[0].lng = req.body.lng;
					transit[0].save();
				} else {
					res.send('Invalid credentials');
				}
			});
		} else {
			newTransit = new Transit( {id: transitId, lat: req.body.lat, lng: req.body.lng} ); 
			newTransit.save();
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

var latLng = [34.73172, -86.58979];

//Everything socket.io related
io.sockets.on('connection', function(socket) {
	socket.on('get location', function( data ) {
		console.log('location update requested')
		io.emit('location update', latLng);
		latLng[0] += 0.5;
		latLng[1] += 0.5;
	});
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port ', app.get('port'));
});
