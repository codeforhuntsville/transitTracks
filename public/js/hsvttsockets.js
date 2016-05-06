HSV_TT.sockets = {};

HSV_TT.sockets.init = function() {
  var socket = io.connect();
  var location = {'lat': null, 'lng': null}; // this was reversed... Western Hemisphere is negative...
  var nextStopSeq = 1;
  var trolleyOn = true;

  function updateMap(data) {
    //console.log(location['lat'] + ':' + location['lng']);
	for (var i = 0, len = data.length; i < len; i++) {
      if(data[i].lat && data[i].long) {		
	    location.lat = data[i].lat;
	    location.lng = data[i].long;
	    HSV_TT.map.updateLocationMarker(data[i].id, location);
	  } else {
		console.log(location['lat'] + ':' + location['lng'] + " remove marker: " + data[i].id);
		HSV_TT.map.removeLocationMarker(data[i].id);
		HSV_TT.removeBusMapMarker(data[i].id);
	  }
	}
  };
  
  function receiveUpdates() {
    console.log('Initializing location updates');
	socket.on('made connect', function(data) {
	  console.log(data.greet + ', next stop is: ' + data.nextSeq);
	  console.log("---> url: " + window.location.href);
      HSV_TT.ui.setNextStop(data.nextSeq, data.route, data.id);	  
	});
    socket.on('location update', function(data) {
      console.log('New locations received: ' + JSON.stringify(data));
      updateMap(data);
    });
    socket.on('trolley off', function(data) {
      if( trolleyOn ) {
	    //alert("The Trolley is currently not operating. \n\nNormal hours of operation:\nFriday - //Saturday\n5:00pm - Midnight");
	    HSV_TT.ui.showNotAvail();
      }
      trolleyOn = false;
	  //trolleyOn = true; // temp
    });
	socket.on('next stop', function(data) {
	  if (data) {
		console.log("next stop changed: " + data.seq + " : " + data.route + " : " + data.id);
	    HSV_TT.ui.setNextStop(data.seq, data.route, data.id);
	  }
	});
  }
  
  receiveUpdates();
  
  function updateLocation() {
    if( /*trolleyOn*/ true ) {
      socket.emit('get location');
    }
    //console.log('Location request sent');
  };
  var interval = setInterval(function(){updateLocation();}, 2000);
};
