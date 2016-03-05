HSV_TT.ui = {
 nextStop : 0	
};



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
	  $('#stopList').append('<li id="st_' + i + '" class="aStop" data="'+ dtStops[i].geometry.coordinates +'">' + 
			  dtStops[i].properties.stop_location + 
	          '&nbsp; at ' + dtStops[i].properties.time + 
	    '</li>');
	}
    $('#stopTimes').css('display','block');
	if (HSV_TT.ui.nextStop) {		
	  $('#st_'+HSV_TT.ui.nextStop).css({'background':'#555','color':'#fff'});
	}
};

// I think we need a HSV_TT.data javascript js... of data manipulation functions the two function below should go there...
HSV_TT.ui.setNextStop = function(seqNum, routeName, busId) {
    console.log("in the UI: " + seqNum + " : " + routeName + " : " + busId);
	routename = (routeName) ? routeName : 'Downtown';
	busId = (busId) ? busId : 0;
    var stopTable =  HSV_TT.ui.getStops(routeName);
    //console.log("Next Stop: " + stopTable[seqNum-1].properties.stop_location); 
	HSV_TT.ui.nextStop = seqNum-1;
    $('#st_'+HSV_TT.ui.nextStop).css({'background':'#555','color':'#fff'});
    //HSV_TT.map.nextStopMark(stopTable[seqNum-1].geometry.coordinates);	
}

HSV_TT.ui.getStops = function(routename) {
	var _stops = $.grep(allStops.features, function(o, i) {
		return o.properties.routename === routename;
	});
	var orderedStops = _stops.sort(function(a,b) {
		return a.properties.stop_sequence-b.properties.stop_sequence;
	});
	//for (var i = 0; i < _stops.length; i++) {
	//	console.log(orderedStops[i].properties.stop_location + " : " + orderedStops[i].properties.stop_sequence + " //: " + orderedStops[i].properties.geo_point_2d[0]);
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
