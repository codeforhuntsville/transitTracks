HSV_TT.sockets = {};

HSV_TT.sockets.init = function() {
  var socket = io.connect();
  var location = {'lat': null, 'lng': null}; // this was reversed... Western Hemisphere is negative...
  var trolleyOn = true;

  function updateMap(data) {
    //console.log(location['lat'] + ':' + location['lng']);
	for (var i = 0, len = data.length; i < len; i++) {
	  location.lat = data[i].lat;
	  location.lng = data[i].long;
	  HSV_TT.map.updateLocation(data[i].id, location);
	}

  };
  function receiveUpdates() {
    console.log('Initializing location updates');
    socket.on('location update', function(data) {
      //console.log('New locations received: ' + JSON.stringify(data));
      updateMap(data);
    });
    socket.on('trolley off', function(data) {
      if( trolleyOn ) {
	alert("The Trolley is currently not operating. \n\nNormal hours of operation:\nFriday - Saturday\n5:00pm - Midnight");
      }
      trolleyOn = false;
    });
  }
  receiveUpdates();
  function updateLocation() {
    if( trolleyOn ) {
      socket.emit('get location');
    }
    //console.log('Location request sent');
  };
  var interval = setInterval(function(){updateLocation();}, 3000);
};
