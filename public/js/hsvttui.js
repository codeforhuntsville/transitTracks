HSV_TT.ui = {};

HSV_TT.ui.closeMenu = function() {	  
    $('.popupContent').css('display','none');	      
	$('.leaflet-bottom').css('display','block');
    $('#menuPopup').css('display','none');
};  

HSV_TT.ui.showSchedule = function() {
    $('#menuPopup').css('display','block');
	$('.leaflet-bottom').css('display','none');
	$('.popupContent').css('display','none');
	$('#stopList').empty();
	for (var i = 0; i < dt_stops.features.length; i++) {
	  //console.log('Stops ' + dt_stops.features[i].properties.time);
	  $('#stopList').append('<li class="aStop" data="'+ dt_stops.features[i].geometry.coordinates +'">' + 
			  'Stops at &nbsp;' + dt_stops.features[i].properties.stop_locat + 
	          '&nbsp; at ' + dt_stops.features[i].properties.time + 
	    '</li>');
	}
    $('#stopTimes').css('display','block');
};