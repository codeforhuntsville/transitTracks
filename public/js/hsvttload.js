HSV_TT = {};

function bus (id, marker) {
	this.id = id;
	this.marker = marker;
};
 
var buses = [];

$(document).ready(function(){
  HSV_TT.fitWindow();
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
  
  //$('#transitMap').on('click', function(e) {
	//  console.log("event: " + Object.keys(e.originalEvent));
	//  HSV_TT.map.onMapClick(e.);  
  //})
  
  $(document).on('click', '#schedule', function() {
    HSV_TT.showSchedule();	
  })

  $(document).on('click', '#scheduleItem', function() {
    HSV_TT.showSchedule();	      
  })	  
  
  $(document).on('click', '.aStop', function() {
    HSV_TT.locateStop($(this).attr('data'));	
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
  
  $(document).on('click', '#disPage', function() {
    $('#menuPopup').css('display','block');
	$('.leaflet-bottom').css('display','none');
	$('.popupContent').css('display','none');
    $('#terms').css('display','block');	      
  })
  
  $(document).on('click tap', '#menuPopup img', function() {
    HSV_TT.closeMenu();
  })
  
  $(document).on('swipeleft swiperight', '#menuPopup', function() {
    HSV_TT.closeMenu();
  })

 
  $('.link').click(function() {
   window.open($(this).attr("data"),'_blank');
   HSV_TT.closeMenu();
  })
   
  //$('#rainspace').click(function() {
  // window.open('http://www.rainspace.com/','_blank');
  //})
  
  //$('#figleaf').click(function() {
  // window.open('http://www.figleafcostumes.com/','_blank');
  //})
  
  //$('#cohImg').click(function() {
  // window.open('http://www.huntsvilleal.gov/publictran/public_trans.php/','_blank');
  //})
  
  $(window).resize(HSV_TT.fitWindow);
  
  HSV_TT.fitWindow();
})

function onMapClick(e) {
   console.log("[" + e.latlng.toString() + "]");
}

HSV_TT.fitWindow = function() {
	  var bh = $('body').height();
	  var chh = $('#contentHead').height();
	  var ch = $('#content').height();	  
	  //DEBUG console.log('Body height: ' + bh);
	  //DEBUG console.log('CHead height: ' + chh);
	  //console.log('bottom height: ' + ch);	  
	  //DEBUG cDEBUG onsole.log('transitMap should be: ' + (bh - (chh+ch)));
	  $('#transitMap').height(bh - (chh+ch));
};

HSV_TT.closeMenu = function() {
  HSV_TT.ui.closeMenu();
};

HSV_TT.showSchedule = function() {
  HSV_TT.ui.showSchedule();
}

HSV_TT.locateStop = function(data) {
	//var cords = data.split(",");
	//console.log('long: ' + cords[0] + ' lat: ' + cords[1]);
	HSV_TT.map.recenterMap(data.split(","));
	HSV_TT.ui.closeMenu();
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

HSV_TT.getBusIndexMarker = function(vid) {
  var retn = null;
  for (var i = 0; i < buses.length; i++) { 
    if (buses[i].id === vid) { 
	  retn = i;
    } 
  }
  return retn;
};

HSV_TT.putBusMapMarker = function (vid, mapMarker) {
  buses.push(new bus(vid, mapMarker));
  console.log("added a bus...");
};

HSV_TT.removeBusMapMarker = function (vid) {
  var indx = HSV_TT.getBusIndexMarker(vid);
  if (indx > -1) {
    buses.splice(indx, 1);  
  }
  console.log("removed a bus...");
};

HSV_TT.getBusesOnRoute = function (routeId) {
// TODO: implement	  
};
