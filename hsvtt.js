'use strict';

var express = require('express.io');
var app = express();
var mongoose = require('mongoose');
//var postmark = require("postmark")(process.env.POSTMARK_API_KEY);
var geoConst = require('./data/geoConst.json');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var geoUtils = require('./lib/geoutils');

//var pastStop = 0;
var nextStopSeq = 1;

//ALL the vehicles
var vehicles = [];

//Shuttle/trolly/auto DB setup
var transitSchema = new mongoose.Schema({
    id: Number,
    long: Number,
    lat: Number,
});
var Transit;

//Event DB structure
var eventSchema = new mongoose.Schema({
    id: Number,
    time: String,
    date: String,
    name: String,
    desciption: String,
    xcorr: Number,
    ycoor: Number
});

//Statistics DB structure
var statsSchema = new mongoose.Schema({
    id: Number,
    hits: Number
});
var Stats;

var userConnSchema = new mongoose.Schema({
    id: String,
    cipaddr: String,
    connStart: { type: Date, default: Date.now },
    connEnd: Date
});
var UserConn;

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    pass: String
});

// Start the cron jobs
require('./lib/cronSchedules');

//Setup DB
mongoose.connect('mongodb://' + process.env.MONGO_USERNAME + ':' + process.env.MONGO_PASSWORD + '@ds053164.mongolab.com:53164/hsvtransit');
mongoose.model('User', userSchema);
Transit = mongoose.model('Transit', transitSchema);
mongoose.model('Event', eventSchema);
Stats = mongoose.model('Stats', statsSchema);
UserConn = mongoose.model('UserConn', userConnSchema);

app.set('port', (process.env.PORT || 5000));

//Setting directory structure
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Setup socket.io
app.http().io();

app.get('/', function (req, res) {
    res.render('pages/index');
    Stats.find({ id: 0 }, function (err, stat) {
        if (stat[0]) {
            stat[0].hits += 1;
            stat[0].save();
        }
    });
});

app.get('/test', function (req, res) {
    io.emit('location update', [34.73172, -86.58979]);
    res.send('Success');
});


app.get('/stats', function (req, res) {
    Stats.find({ id: 0 }, function (err, stat) {
        if (stat[0]) {
            res.send('Hits: ' + stat[0].hits);
        } else {
            res.send('Error getting stats.');
        }
    });
});

//Adds account
app.post('/api/v1/account', function (req, res) {
    var transitId = req.params.id;
    Transit.find({ id: transitId }, function (err, transit) {
        var newTransit;

        if (transit[0]) {
            res.send('Account already created');
        } else {
            newTransit = new Transit({ id: transitId, lat: 0, long: 0 });
            newTransit.save();
            res.send('Account created');
        }
    });
});

//Updates account
app.post('/api/v1/account/:id', function (req, res) {
    res.send('Hello world!');
});

//Reads account
app.get('/api/v1/account/:id', function (req, res) {
    res.send('Hello world!');
});

function checkStops(curPnt) {
    var ns = nextStopSeq;
    var i;
    var testB;
    var data;

    //for each in stop array
    var len = geoConst.dtStopArray.length - 1;
    for (i = 0; i < len; ++i) {
        testB = geoUtils.setStopBounds(ns - 1);

        if (geoUtils.contains(curPnt, testB)) {
            nextStopSeq = ns + 1;
            //nextStopBounds = geoUtils.setStopBounds(nextStopSeq -1);
            data = { seq: nextStopSeq, route: 'Downtown', id: 0 };
            io.emit('next stop', data);
            return;
        }
        ns = ns < len ? ++ns : 1;
    }
}

//Adds location
app.post('/api/v1/trolly/:id/location', function (req, res) {
    var returnStr = 'location api called ';
    var transitId = req.params.id;

    var vehicle = vehicles.find(function (vehicle) { return vehicle.id === transitId; });

    if (vehicle) {
        if (geoUtils.contains([req.body.lat, req.body.lon], geoConst.dtBounds)) {
            vehicle.lat = req.body.lat;
            vehicle.long = req.body.lon;
            checkStops([vehicle.lat, vehicle.long]);
            returnStr = returnStr.concat('location updated');
        } else {
            returnStr = returnStr.concat('location update failed');
        }
    } else {
        vehicles.push({ id: transitId, lat: req.body.lat, long: req.body.lon });
        returnStr = 'new bus location added';
    }

    res.send(returnStr);
  /*
  Transit.find({id: transitId}, function( err, transit ) {
    returnStr = "updating location";
    if( transit[0] ) {
      returnStr = 'Recording location into DB: ' + transit[0].id + " - ";
      if (geoUtils.contains([req.body.lat,req.body.lon], geoConst.dtBounds)) {
        transit[0].lat = req.body.lat;
      transit[0].long = req.body.lon;
      checkStops([transit[0].lat,transit[0].long])
      transit[0].save();
      returnStr = returnStr.concat("db updated");
      } else {
      returnStr = returnStr.concat("db update failed");
      console.log('Invalid credentials in location update');
      }
    } else {
      newTransit = new Transit( {id: transitId, long: req.body.lng, lat: req.body.lat} );
      newTransit.save();
      returnStr = "new bus location added";
      console.log(returnStr);
    }
    res.send(returnStr);
  });
  */
});

//Reads location
app.get('/api/v1/trolly/:id/location', function (req, res) {
    res.send('Hello world!');
});

//Gets status of trollies
app.get('/api/v1/trollies', function (req, res) {
    res.send('Hello world!');
});

//Gets stops for a single trolley
app.get('/api/v1/trollies/:id/stops', function (req, res) {
    res.send('Hello world!');
});

/*
function findLocations() {
  //console.log('Updating current location');
  Transit.find({},{id:1,lat:1,long:1,_id:0}, function(err, transit) {
    //console.log("Getting coords for " + transit.length)
    if( transit.length > 0 ) {
      allLocations = transit;
    } else {
      console.log('DB credentials supplied incorrect');
    }
  });
}
*/

//var interval = setInterval(function(){findLocations();},3000);

//Trolley Service Schedule - Will need schedule for each route
function isTrolleyInactive() {
    // would like to extend this to start at 4pm and end at 1am following morning... of course
    // that complicates the testing
    var trolleyInactive = true; // named the variable for readability
    var date = new Date();
    date.setHours(date.getHours()); // minus 6 from UTC time - CHANGE for DAYLIGHT/STANDARD TIME

    if (date.getDay() === 5 && date.getHours() <= 24 && date.getHours() >= 16) {
        trolleyInactive = false;
    }

    if (trolleyInactive && date.getDay() === 6 && ((date.getHours() === 0)
        || (date.getHours() <= 24 && date.getHours() >= 16))) {
        trolleyInactive = false;
    }

    if (trolleyInactive && date.getDay() === 0 && date.getHours() === 0) {
        trolleyInactive = false;
    }

    return trolleyInactive;
}

//Everything socket.io related
io.sockets.on('connection', function (socket) {
    var newConnect = new UserConn({
        id: socket.id,
        cipaddr: socket.handshake.address,
        connStart: new Date(),
        connEnd: null
    });
    newConnect.save();
    io.emit('made connect', { nextSeq: nextStopSeq, greet: 'hello there' });
    socket.on('get location', function () {
        if (isTrolleyInactive()) {
            io.emit('trolley off', []);
        } else {
            io.emit('location update', vehicles);
        }
    });
    socket.on('disconnect', function () {
        UserConn.find({ id: socket.id }, function (err, uc) {
            var returnStr = 'updating connection';
            if (uc[0]) {
                returnStr = 'Recording user connection diconnect: ' + uc[0].cipaddr + ' - ';
                uc[0].connEnd = new Date();
                uc[0].save();
                returnStr = returnStr.concat('db updated');
            } else {
                returnStr = returnStr.concat('db update failed');
            }
        });
    });
});

/*************************************************
*Admin Functionality
*WARNING: Suspending development of section indefinitely
*************************************************/
/*
app.get('/admin', function(req, res) {
  var updates = [];
  res.render('pages/admin', {messages: updates});
});

app.get('/admin/addevent', function(req, res) {
  res.render('pages/eventadd');
});
*/

// Opening server to requests
http.listen(app.get('port'), function () {
    var d = new Date();
    d.setHours(d.getHours());
});

//--- Test stuff ---------------------------------------
console.log('Trolley Home: ' + geoConst.trolleyHome);

//console.log('read array ' + geoConst.dtStopArray[seq1][1]);
/*
var testsend = require('./lib/sendNotification');
var to = "contact@hoparoundhuntsville.com"
var subject = "Message from user on Hop Around Huntsville"
var message = "This is a test message... hoparoundhuntsville on transittracks-dev has fired up"
var response = null;
testsend.send(to, subject, message, response);
*/
//----------------------------------------------------------------------------------
