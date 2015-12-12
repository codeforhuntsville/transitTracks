HSV_TT.map = {};

var map = null;
var trolleyHomeLocation = {latlng: {lat: 34.73689, lng: -86.59192} };
var locationOfQuery = null;
var trolleyIcon = L.Icon.Default.extend({
	options: {
	  iconUrl: '/images/trolleyIcon2.png',
      iconSize: [25, 30],
	  iconAnchor: [12, 30],
	  popupAnchor: [1, -30]  
	}
  });
var testIcon = L.Icon.Default.extend({
	options: {
	  iconUrl: '/images/testIcon.png',
      iconSize: [15, 20],
	  iconAnchor: [7, 20],
	  popupAnchor: [1, -20]  
	}
  });
var shuttleIcon = L.Icon.Default.extend({
	options: {
	  iconUrl: '/images/shuttleIcon.png',
      iconSize: [25, 30],
	  iconAnchor: [12, 30],
	  popupAnchor: [1, -30]  
	}
  });
  
HSV_TT.map.init = function() {	  
  map = L.map('transitMap').setView([34.731, -86.588], 15);
  var stopIcon = L.Icon.Default.extend({
	options: {
	  iconUrl: '/images/stopIcon4.png',
      iconSize: [13, 15],
	  iconAnchor: [6, 15],
	  popupAnchor: [0, -15],
      shadowSize: [0,0]	  
	}
  });
  
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'hsvtransit.cigx5tx9c0u474mm3jqvacywa',
    accessToken: 'pk.eyJ1IjoiaHN2dHJhbnNpdCIsImEiOiJjaWd4NXR5bDcwdWdiNjVtMHJqajByZ2FwIn0.MGnCx-SYksm4Ia8-4CoWMg'
  }).addTo(map);
  
  var dtRoute = L.geoJson(dt_route).addTo(map);
  dtRoute.bindPopup("<b>Entertainment Trolley Route</b>" +
                     "<br><b>Hours of Operation:</b> 5pm to 12am Fridays and Saturdays");
  
  var stops = L.geoJson(dt_stops, { 
    pointToLayer: function( feature, latlng ) {
      return L.marker(latlng, {icon: new stopIcon()});
	},
   	onEachFeature: function (feature, layer) {
	  layer.bindPopup("<b>Stop:</b> " + feature.properties.stop_seque + 
		              "<br><b>Scheduled Time:</b> " + feature.properties.time +
					  "<br><b>Location:</b> " + feature.properties.stop_locat );
	}  
   });
   stops.addTo(map);
   L.control.locate().addTo(map);
   
   // experiment ---  TODO
   map.locate();
   
   map.on('locationfound', function(e) {
     for(var k in e) {
       console.log(k + " = " + e[k] + "\n");
	 }
	 locationOfQuery = e.latlng;
	 console.log("location of query = " + locationOfQuery.lat + ", " + locationOfQuery.lng);
	 // TODO when we have sessions set up save this location with the session ID.
   });
   //----------------  
}



HSV_TT.map.updateLocation = function (vid, latlng) {
	//console.log("Bus number: " + vid + " has new location: " + latlng.lat +", " + latlng.lng);
	var mm = HSV_TT.getBusMapMarker(vid); 
	if (mm) {
	  //console.log("Have marker object");
	  mm.setLatLng(latlng).update();
	} else {
	  if (vid === 0) {
		var mm = L.marker([latlng.lat,latlng.lng], {icon: new trolleyIcon()}).addTo(map);
		mm.bindPopup("Entertainment Trolley");
	  } else if (vid === 999) {
		var mm = L.marker([latlng.lat,latlng.lng], {icon: new testIcon()}).addTo(map);
		mm.bindPopup("Test Vehicle id = " + vid);
	  } else {
		var mm = L.marker([latlng.lat,latlng.lng], {icon: new shuttleIcon()}).addTo(map);
		mm.bindPopup("Shuttle bus number " + vid);
	  }
	  HSV_TT.putBusMapMarker(vid, mm); 	  
	}
}
