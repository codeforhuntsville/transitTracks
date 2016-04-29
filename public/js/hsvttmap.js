HSV_TT.map = {};

var map = null;

// this needs to go in JSON file... ------------
var routeNames = [['Downtown','green']];
//                need to coordinate route color scheme with city transit scheme....   
//                ['Blue Coreloop','blue'],['Red Coreloop','red'],['Route 3',someColor],
//                ['Route 4',someColor],['Route 5',someColor],['Route 6',someColor],
//                ['Route 7',someColor],['Route 8',someColor],['Route 9',someColor],
//                ['UAH',someColor];
//----------------------------------------------

var routeLayers = [];
var stopLocationCircle = null;
var nextStopMark = null;
				  
var trolleyHomeLocation = {latlng: {lat: 34.73689, lng: -86.59192} };
var locationOfQuery = null;
var trolleyIcon = L.Icon.Default.extend({
	options: {
	  iconUrl: '/images/trolleyIcon3.png',
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

  var overlayMaps = HSV_TT.map.createRouteLayers(routeNames);
  // TODO this is ackward - change at some point ------
  overlayMaps['Downtown'].bindPopup("<b>Entertainment Trolley Route</b>" +
                     "<br><b>Hours of Operation:</b> 5pm to 12am Fridays and Saturdays");
  //---------------------------------------------------
  var stops = L.geoJson(HSV_TT.ui.getStops('Downtown'), {    
    pointToLayer: function( feature, latlng ) {
      return L.marker(latlng, {icon: new stopIcon()});
	},
   	onEachFeature: function (feature, layer) {
	  layer.bindPopup("<b>Stop:</b> " + feature.properties.Stop_Sequence + 
		              "<br><b>Scheduled Time:</b> " + feature.properties.Time_ +
					  "<br><b>Location:</b> " + feature.properties.Stop_Location );
	}  
   });
   stops.addTo(map);
   map.addLayer(overlayMaps['Downtown']); // will work with an array of route names
   L.control.locate().addTo(map);
   //HSV_TT.map.nextStopMark([34.73146324046631,-86.58602399965186]);
   
   // Full sytem  ---  TODO
   /*
   
   THIS ALL works... will implement w/ full system
   L.control.layers(null, overlayMaps).addTo(map); // check box control for turning on route maps
   
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
   */
   // Record clicks-----------------------
   //   map.on('click', HSV_TT.map.onMapClick);
   //----------------------------------end   
}

//HSV_TT.map.onMapClick = function(e) {
//   console.log("[" + e.latlng.lat + "," + e.latlng.lng + "]");
//}

HSV_TT.map.recenterMap = function(lngLat) {
	//DEBUG console.log('long: ' + lngLat[0] + ' lat: ' + lngLat[1]);
	map.panTo(new L.LatLng(lngLat[1], lngLat[0]));
	HSV_TT.map.stopLocateMark(lngLat);
}

HSV_TT.map.stopLocateMark = function(lngLat) {
  if (stopLocationCircle) {
    map.removeLayer(stopLocationCircle);
  }
  stopLocationCircle = L.circle([lngLat[1], lngLat[0]], 15, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.8
  }).addTo(map);
}

HSV_TT.map.nextStopMark = function(lngLat) {
  if (nextStopMark) {
    map.removeLayer(nextStopMark);
  }
  nextStopMark = L.polygon(getStopBounds(lngLat), {
    color: 'blue',
    fillColor: '#0aa',
    fillOpacity: 0.8
  }).addTo(map);
}

function getStopBounds(pnt){
	return rtnBounds = [ [pnt[1]+.00018,pnt[0]-.00018],[pnt[1]+.00018,pnt[0]+.00018],
	                     [pnt[1]-.00018,pnt[0]+.00018],[pnt[1]-.00018,pnt[0]-.00018] ]
};

HSV_TT.map.updateLocationMarker = function (vid, latlng) {
	//console.log("Bus number: " + vid + " has new location: " + latlng.lat +", " + latlng.lng);
	var mm = HSV_TT.getBusMapMarker(vid); 
	if (mm) {
	  //console.log("Have marker object");
	  mm.setLatLng(latlng).update();
	} else {
	  if (vid === "0") {
		var mm = L.marker([latlng.lat,latlng.lng], {icon: new trolleyIcon()}).addTo(map);
		mm.bindPopup("Entertainment Trolley");
	  } else if (vid === "999") {
		var mm = L.marker([latlng.lat,latlng.lng], {icon: new testIcon()}).addTo(map);
		mm.bindPopup("Test Vehicle id = " + vid);
	  } else {
		var mm = L.marker([latlng.lat,latlng.lng], {icon: new shuttleIcon()}).addTo(map);
		mm.bindPopup("Shuttle bus number " + vid);
	  }
	  HSV_TT.putBusMapMarker(vid, mm); 	  
	}	
}

HSV_TT.map.removeLocationMarker = function(vid) {
	var mm = HSV_TT.getBusMapMarker(vid); 
	if (mm) {
	  //mm.clearLayers();
	  map.removeLayer(mm);
	}
}

HSV_TT.map.createRouteLayers = function(routeNames) {
	var obj = {};
	for (var i = 0; i < routeNames.length; i++) {
	  //DEBUG console.log('layer: ' + routeNames[i][0]);
	  
	  var rnom = routeNames[i][0];
	  //obj[rnom] = L.geoJson(HSV_TT.ui.getRoutes(routeNames[i][0]),{ 
	  obj[rnom] = L.geoJson(HSV_TT.ui.getRoutes(rnom),{
	    style: {
	             //weight: 2,
                 opacity: .6,
                 color: routeNames[i][1]
                 //dashArray: '3',
                 //fillOpacity: 0.3,
                 //fillColor: '#ff0000'
			   }
	  })
	}	
	//DEBUG console.log('layers: ' + obj.length);;
	return obj;
}

// this function does not order the routes correctly don't use
HSV_TT.map.getRouteNames = function() {
  var flags = [], output = [], l = allRoutes.features.length, i;
    for( i=0; i<l; i++) {
      if( flags[allRoutes.features[i].properties.routename]) continue;
      flags[allRoutes.features[i].properties.routename] = true;
      output.push(allRoutes.features[i].properties.routename);
  }
  console.log('Names: ' + output);
}
