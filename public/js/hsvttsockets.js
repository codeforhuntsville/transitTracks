HSV_TT.sockets = {};

HSV_TT.sockets.init = function() {
  var socket = io.connect();
  var location = {'lng': 34.731, 'lat': -86.586};
  function updateMap() {
    console.log(location);
  };
  function receiveUpdates() {
    socket.on('location update', function(data) {
      location['lng'] = data[0];
      location['lat'] = data[1];
      updateMap();
    });
  }
  receiveUpdates();
  function updateLocation() {
    socket.emit('get location');
  };
  setInterval(updateLocation(), 3000);
};
