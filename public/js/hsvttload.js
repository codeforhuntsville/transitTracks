HSV_TT = {};

function bus (id, marker) {
	this.id = id;
	this.marker = marker;
};
 
var buses = [];

$(document).ready(function(){
  $('#slideMenu').click(function(){
	   if ($('#menuPopup').css('display') != 'none') {
		 $('#menuPopup').css('display','none');
	   }
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
  
  $(document).on('click', '#schedule', function() {
    showSchedule();	      
  })

  $(document).on('click', '#scheduleItem', function() {
    showSchedule();	      
  })	  
  
  $(document).on('click', '#aboutItem', function() {
    $('#menuPopup').css('display','block');
	$('.leaflet-bottom').css('display','none');
	$('.popupContent').css('display','none');
    $('#about').css('display','block');	      
  })
    
  $(document).on('click', '#sponsorsItem', function() {
    $('#menuPopup').css('display','block');
	$('.leaflet-bottom').css('display','none');
	$('.popupContent').css('display','none');
    $('#sponsors').css('display','block');	      
  })
  
  $(document).on('click', '#menuPopup img', function() {
    closeMenu();
  })
    
  $('#rainspace').click(function() {
   window.open('http://www.rainspace.com/','_black');
  })
  
  $('#figleaf').click(function() {
   window.open('http://www.figleafcostumes.com/','_blank');
  })
  
  $('#cohImg').click(function() {
   window.open('http://www.huntsvilleal.gov/publictran/public_trans.php/','_blank');
  })
  
  //console.log("stops: " + dt_stops);
  
})

closeMenu = function() {
  HSV_TT.ui.closeMenu();
};

showSchedule = function() {
  HSV_TT.ui.showSchedule();
}

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
