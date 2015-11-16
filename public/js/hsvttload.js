HSV_TT = {};
  
  // TODO: make a bus prototype here	  
  var buses = [
    {route: 0, id: 0, marker: null},
	{route: 1, id: 1, marker: null},
    {route: 1, id: 2, marker: null},
    {route: 1, id: 3, marker: null},
    {route: 2, id: 4, marker: null},
    {route: 2, id: 5, marker: null}
  ];

  HSV_TT.getBusMapMarker = function(vid) {
	retObj = null;
    for (var i = 0; i < buses.length; i++) { 
      if (buses[i].id === vid) { 
        retObj = buses[i].marker;
        break;
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
