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
			  dtStops[i].properties.Stop_Location + 
	          '&nbsp; at ' + dtStops[i].properties.Time_ + 
	    '</li>');
	}
    $('#stopTimes').css('display','block');
	if (HSV_TT.ui.nextStop) {
	  // Disabled for time being...
      //$('.stopActive').removeClass("stopActive");		
	  //$('#st_'+HSV_TT.ui.nextStop).addClass("stopActive");
	}
};

HSV_TT.ui.showNotAvail = function() {
    $('#menuPopup').css('display','block');
	$('.leaflet-bottom').css('display','none');
	$('.popupContent').css('display','none');
	$('#stopList').empty();
    $('#noavail').css('display','block');

};
// I think we need a HSV_TT.data javascript js... of data manipulation functions the two function below should go there...
HSV_TT.ui.setNextStop = function(seqNum, routeName, busId) {
	routeName = (routeName) ? routeName : 'Downtown';
	busId = (busId) ? busId : 0;
    var stopTable =  HSV_TT.ui.getStops(routeName);
    //console.log("Next Stop: " + stopTable[seqNum-1].properties.stop_location); 
	HSV_TT.ui.nextStop = seqNum-1;
	$('.stopActive').removeClass("stopActive");
    $('#st_'+HSV_TT.ui.nextStop).addClass("stopActive");
	
    //HSV_TT.map.nextStopMark(stopTable[seqNum-1].geometry.coordinates); //disable until we make it smoother
	//
}

HSV_TT.ui.getStops = function(routename) {
	var _stops = $.grep(allStops.features, function(o, i) {
		return o.properties.RouteName === routename;
	});
	var orderedStops = _stops.sort(function(a,b) {
		return a.properties.Stop_Sequence-b.properties.Stop_Sequence;
	});
	/*
	for (var i = 0; i < _stops.length; i++) {
		console.log(orderedStops[i].properties.stop_location + " : " + orderedStops[i].properties.stop_sequence + " //: " + orderedStops[i].properties.geo_point_2d[0]);
	}*/
    return _stops;	
}

HSV_TT.ui.getRoutes = function(routename) {
	var _routes = $.grep(allRoutes.features, function(o, i) {
		return o.properties.RouteName === routename;
	});
    return _routes;	
}
