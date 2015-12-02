
$(document).ready(function(){
  $('#slideMenu').click(function(){
       if ($(this).hasClass('closed')) {       
        $(this).animate({right:"0"},"slow");
		$('#menuIcon img').attr('src','/images/menuClose.png');
		$('#menuIcon').css('margin','0');
        $(this).css('width','90px');	
		$(this).removeClass('closed');
                
      } else {
        $(this).animate({right:"-80px"},"slow");
        $(this).css('width','120px');	
		$('#menuIcon').css('margin','10px');
    	$('#menuIcon img').attr('src','/images/menuIcon.png');
	    $(this).addClass('closed');
      }
  })
})

HSV_TT = {};

function bus (id, marker) {
	this.id = id;
	this.marker = marker;
};
 
var buses = [];


HSV_TT.getBusMapMarker = function(vid) {
  retObj = null;
  for (var i = 0; i < buses.length; i++) { 
    if (buses[i].id === vid) { 
	  rt = buses[i].marker;
	//console.log("Returning map marker...");
	  retObj = rt;
    } 
  }
  return retObj;
};

HSV_TT.putBusMapMarker = function (vid, mapMarker) {
  buses.push(new bus(vid, mapMarker));
  console.log("added a bus...");
};

HSV_TT.getBusesOnRoute = function (routeId) {
// TODO: implement	  
};
