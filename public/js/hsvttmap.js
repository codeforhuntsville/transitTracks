HSV_TT.map = {};

var map;

HSV_TT.map.init = function() {	  
  map = L.map('transitMap').setView([34.731, -86.586], 15);
  var stopIcon = L.Icon.Default.extend({
	options: {
	  iconUrl: '/images/stopIcon.png',
      iconSize: [16, 19],
	  iconAnchor: [8, 10],
	  popupAnchor: [1, 1]  
	}
  });
  
  //TODO: implement
  //var shuttleIcon = L.Icon.Default.extend({
  //  options: {
  //	  iconUrl: '/images/stopIcon.png',
  //    iconSize: [16, 19],
  //	  iconAnchor: [8, 10],
  //	  popupAnchor: [1, 1]  
  //	}
  //});
  
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'hsvtransit.cigx5tx9c0u474mm3jqvacywa',
    accessToken: 'pk.eyJ1IjoiaHN2dHJhbnNpdCIsImEiOiJjaWd4NXR5bDcwdWdiNjVtMHJqajByZ2FwIn0.MGnCx-SYksm4Ia8-4CoWMg'
  }).addTo(map);
  
  L.geoJson(dt_route).addTo(map);

  stops = L.geoJson(dt_stops, { 
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
}


HSV_TT.map.updateLocation = function (vid, latlng) {
  var trolleyIcon = L.Icon.Default.extend({
	options: {
	  iconUrl: '/images/trolleyIcon.png',
      iconSize: [33, 38],
	  iconAnchor: [16, 19],
	  popupAnchor: [1, 1]  
	}
  });

	console.log("Bus number: " + vid + " has new location: " + latlng.lat +", " + latlng.lng);
	var mm = HSV_TT.getBusMapMarker(vid); 
	if (mm) {
	  mm.setLatLng(latlng).update();
	} else {
	  //mm = vid == 0 ? trolleyIcon : shuttleIcon();
	  var mm = L.marker(latlng, {icon: new trolleyIcon()}).addTo(map);
      HSV_TT.putBusMapMarker(vid, mm); 	  
	}
}
