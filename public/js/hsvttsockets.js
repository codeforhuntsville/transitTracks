HSV_TT.sockets = {};

HSV_TT.sockets.init = function() {
  var socket = io.connect();
  var location = {'lng': 34.731, 'lat': -86.586};
  function updateMap() {
    HSV_TT.map.updateLocation(0, [location['lat'], location['lng']]);
  };
  function receiveUpdates() {
    console.log('Initializing location updates');
    socket.on('location update', function(data) {
      console.log('New location received');
      location['lng'] = data[0];
      location['lat'] = data[1];
      updateMap();
    });
  }
  receiveUpdates();
  function updateLocation() {
    socket.emit('get location');
    console.log('Location request sent');
  };
  var interval = setInterval(function(){updateLocation}, 3000);
};
