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
    
   function userMakers() {
        // generate unique user id
        var userId = Math.random().toString(16).substring(2, 15);

        var info = $('#infobox');
        var doc = $(document);
        
        var sentData = {};
        
        var connects = {};
        var markers = {};
        var active = false;
        
        socket.on('load:coords', function (data) {
            if (!(data.id in connects)) {
                HSV_TT.map.setMarker(data);
            }
            
            connects[data.id] = data;
            connects[data.id].updated = $.now();
        });
        
        // check whether browser supports geolocation api
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(positionSuccess, positionError, { enableHighAccuracy: true });
        } else {
            $('#transitMap').text('Your browser is out of fashion, there\'s no geolocation!');
        }
        
        function positionSuccess(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            var acr = position.coords.accuracy;
            
            HSV_TT.map.markUserPosition(lat, lng, userId);
            // mark user's position
           
            
            var emit = $.now();
            // send coords on when user is active
            doc.on('mousemove', function () {
                active = true;
                
                sentData = {
                    id: userId,
                    active: active,
                    coords: [{
                            lat: lat,
                            lng: lng,
                            acr: acr
                        }]
                };
                
                if ($.now() - emit > 30) {
                    socket.emit('send:coords', sentData);
                    emit = $.now();
                }
            });
        }
        
        doc.bind('mouseup mouseleave', function () {
            active = false;
        });
        
       
        // handle geolocation api errors
        function positionError(error) {
            var errors = {
                1: 'Authorization fails', // permission denied
                2: 'Can\'t detect your location', //position unavailable
                3: 'Connection timeout' // timeout
            };
            showError('Error:' + errors[error.code]);
        }
        
        function showError(msg) {
            info.addClass('error').text(msg);
            
            doc.click(function () {
                info.removeClass('error');
            });
        }
        
        // delete inactive users every 15 sec
        setInterval(function () {
            for (var ident in connects) {
                if ($.now() - connects[ident].updated > 15000) {
                    delete connects[ident];
                    map.removeLayer(markers[ident]);
                }
            }
        }, 15000);
    };  

    receiveUpdates();
    userMakers();
  
  function updateLocation() {
    if( /*trolleyOn*/ true ) {
      socket.emit('get location');
    }
    //console.log('Location request sent');
  };
  var interval = setInterval(function(){updateLocation();}, 500);
};
