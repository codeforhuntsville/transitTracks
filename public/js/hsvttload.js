HSV_TT = {};
  
  // TODO: make a bus prototype here	  
  var buses = [
    {route: 0, id: 0, marker: "trolley"},
	{route: 1, id: 1, marker: "bus 1 marker"},
    {route: 1, id: 2, marker: "bus 2 marker"},
    {route: 1, id: 3, marker: "bus 3 marker"},
    {route: 2, id: 4, marker: "bus 4 marker"},
    {route: 2, id: 5, marker: "bus 5 marker"}
  ];

  HSV_TT.getBusMapMarker : function(vid) {
	retObj = null;
    for (var i = 0; i < buses.length; i++) { 
      if (buses[i].id === vid) { 
        retObj = buses[i].marker;
        break;
      } 
    }
  };

  HSV_TT.putBusMapMarker : function (vid, mapMarker) {
    for (var i = 0; i < buses.length; i++) { 
      if (buses[i].id === vid) { 
        buses[i].marker = mapMarker;
        break;
      } 
    }
  };
  
  HSV_TT.getBusesOnRoute : function (routeId) {
  // TODO: implement	  
  };
