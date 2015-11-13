HSV_TT.map = {};

var eData = [
  new google.maps.LatLng(34.736227, -86.733427),
  new google.maps.LatLng(34.723835, -86.771697),
  new google.maps.LatLng(34.684600, -86.729300)
];
//var pointArray = new google.maps.MVCArray(eData);

//var heatmap;

HSV_TT.map.codeAddress = function() {
  geocoder = new google.maps.Geocoder();
  var address = document.getElementById('address').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      //alert('LatLong: ' + results[0].geometry.location);
      //var latlng = new google.maps.LatLng(34.684600, -86.729300);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
          //position: latlng
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
};

HSV_TT.map.toggleHeatmap = function() {
  if (heatmap == null) {
    var pointarray = new google.maps.MVCArray(eData);
    heatmap = new google.maps.visualization.HeatmapLayer({
      data: pointarray
    });
  }
  //heatmap.setMap(map);
  heatmap.setMap(heatmap.getMap() ? null : map);
}

HSV_TT.map.changeGradient = function() {
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]
  heatmap.setOptions({
    gradient: heatmap.get('gradient') ? null : gradient
  });
}

HSV_TT.map.changeRadius = function()  {
  heatmap.setOptions({radius: heatmap.get('radius') ? null : 20});
}

HSV_TT.map.changeOpacity = function()  {
  heatmap.setOptions({opacity: heatmap.get('opacity') ? null : 0.2});
}


/*
<!DOCTYPE html>
<html>
  <head>
    <title>Remove an overlay</title>
    <link href="/maps/documentation/javascript/examples/default.css" rel="stylesheet">
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
    <script>
var map;
var markers = [];

function initialize() {
  var haightAshbury = new google.maps.LatLng(37.7699298, -122.4469157);
  var mapOptions = {
    zoom: 12,
    center: haightAshbury,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng);
  });
}

// Add a marker to the map and push to the array.
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
}

// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the overlays from the map, but keeps them in the array.
function clearOverlays() {
  setAllMap(null);
}

// Shows any overlays currently in the array.
function showOverlays() {
  setAllMap(map);
}

// Deletes all markers in the array by removing references to them.
function deleteOverlays() {
  clearOverlays();
  markers = [];
}

google.maps.event.addDomListener(window, 'load', initialize);

    </script>
  </head>
  <body>
    <div id="panel">
      <input onclick="clearOverlays();" type=button value="Hide Overlays">
      <input onclick="showOverlays();" type=button value="Show All Overlays">
      <input onclick="deleteOverlays();" type=button value="Delete Overlays">
    </div>
    <div id="map-canvas"></div>
    <p>Click on the map to add markers.</p>
  </body>
</html>
*/
