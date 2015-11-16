HSV_TT.sockets = {};

HSV_TT.sockets.init = function() {
  var socket = io.connect();
  var location = {'lat': 34.731, 'lng': -86.586}; // this was reversed... Western Hemisphere is negative...
  function updateMap() {
    console.log(location['lat'] + ':' + location['lng']);
    HSV_TT.map.updateLocation(0, location);
  };
  function receiveUpdates() {
    console.log('Initializing location updates');
    socket.on('location update', function(data) {
      console.log('New location received');
      location['lat'] = data[0];
      location['lng'] = data[1];
      updateMap();
    });
  }
  receiveUpdates();
  function updateLocation() {
    socket.emit('get location');
    console.log('Location request sent');
  };
  var interval = setInterval(function(){updateMap();}, 3000);
};
