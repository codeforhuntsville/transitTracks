HSV_TT = {};
  
  // TODO: make a bus prototype here	  
  var buses = [];

  HSV_TT.getBusMapMarker = function(vid) {
	retObj = null;
    for (var i = 0; i < buses.length; i++) { 
      if (buses[i].id === vid) { 
        retObj = buses[i].marker;
		console.log("Returning map marker...")
        return retObj;
      } 
    }
  };

  HSV_TT.putBusMapMarker = function (vid, mapMarker) {
    for (var i = 0; i < buses.length; i++) { 
      if (buses[i].id === vid) { 
        buses[i].marker = mapMarker;
        break;
      } 
    }
  };
  
  HSV_TT.getBusesOnRoute = function (routeId) {
  // TODO: implement	  
  };
