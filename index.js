//Getting all dependencies
var express = require('express.io');
var app = express();

var http = require('http').Server(app)
var io = require('socket.io')(http);
var bodyParser = require('body-parser');


app.set('port', (process.env.PORT || 80));

//Setting directory structure
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use( bodyParser.urlencoded({extended: false }));
app.use( bodyParser.json());

app.get('/', function(req, res) {
	res.render('pages/index');
});

//Adds account
app.post('/api/v1/account', function(req, res) {
	res.send('Hello world!');
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
	res.send('Hello world!');
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

//Everything socket.io related
io.sockets.on('connection', function(socket) {
	socket.on('get location', function( data ) {
		io.emit('location update', [10.92, 83.21]);
	});
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port ', app.get('port'));
});
