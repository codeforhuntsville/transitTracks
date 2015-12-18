HSV_TT.ui = {};

HSV_TT.ui.closeMenu = function() {	  
    $('.popupContent').css('display','none');	      
	$('.leaflet-bottom').css('display','block');
    $('#menuPopup').css('display','none');
};  

HSV_TT.ui.showSchedule = function() {
	var dtStops = HSV_TT.ui.getStops("Downtown"); //TODO this needs to be more generic, for selected route
    $('#menuPopup').css('display','block');
	$('.leaflet-bottom').css('display','none');
	$('.popupContent').css('display','none');
	$('#stopList').empty();
	for (var i = 0; i < dtStops.length; i++) {
	  //console.log('Stops ' + dt_stops.features[i].properties.time);
	  $('#stopList').append('<li class="aStop" data="'+ dtStops[i].geometry.coordinates +'">' + 
			  'Stops at &nbsp;' + dtStops[i].properties.stop_location + 
	          '&nbsp; at ' + dtStops[i].properties.time + 
	    '</li>');
	}
    $('#stopTimes').css('display','block');
};

HSV_TT.ui.getStops = function(routename) {
	var _stops = $.grep(allStops.features, function(o, i) {
		return o.properties.routename === routename;
	});
	var orderedStops = _stops.sort(function(a,b) {
		return a.properties.stop_sequence-b.properties.stop_sequence;
	});
	//for (var i = 0; i < _stops.length; i++) {
	//	console.log('Stop: ' + orderedStops[i].properties.stop_sequence + " : " + //orderedStops[i].properties.stop_location);
	//}
    return _stops;	
}

HSV_TT.ui.getRoutes = function(routename) {
	//console.log("object exp : " + exp.features.length);
	var _routes = $.grep(allRoutes.features, function(o, i) {
		return o.properties.routename === routename;
	});
    return _routes;	
}
