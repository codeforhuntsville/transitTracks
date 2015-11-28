HSV_TT = {};
  
  // TODO: make a bus prototype here
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
		console.log("Returning map marker...");
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
