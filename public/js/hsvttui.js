HSV_TT.ui = {
    nextStop: 0
};

HSV_TT.ui.closeMenu = function () {
    $('.popupContent').css('display', 'none');
    $('.leaflet-bottom').css('display', 'block');
    $('#menuPopup').css('display', 'none');
};

HSV_TT.ui.showSchedule = function () {
    //TODO this needs to be more generic, for selected route
    var dtStops = HSV_TT.ui.getStops('Downtown');
    $('#menuPopup').css('display', 'block');
    $('.leaflet-bottom').css('display', 'none');
    $('.popupContent').css('display', 'none');
    $('#stopList').empty();
    dtStops.forEach(function (stop, i) {
        $('#stopList').append('<li id="st_' + i + '" class="aStop" data="' +
            stop.geometry.coordinates + '">' +
            stop.properties.stop_location +
            '&nbsp; at ' + stop.properties.time +
        '</li>');
    });
    $('#stopTimes').css('display', 'block');
    if (HSV_TT.ui.nextStop) {
      // Disabled for time being...
      //$('.stopActive').removeClass("stopActive");
      //$('#st_'+HSV_TT.ui.nextStop).addClass("stopActive");
    }
};

HSV_TT.ui.showNotAvail = function () {
    $('#menuPopup').css('display', 'block');
    $('.leaflet-bottom').css('display', 'none');
    $('.popupContent').css('display', 'none');
    $('#stopList').empty();
    $('#noavail').css('display', 'block');

};

// I think we need a HSV_TT.data javascript js... of data manipulation functions
// the two function below should go there...
HSV_TT.ui.setNextStop = function (seqNum, routeName, busId) {
    routeName = routeName || 'Downtown';
    busId = busId || 0;
    HSV_TT.ui.getStops(routeName);
    HSV_TT.ui.nextStop = seqNum - 1;
    //$('.stopActive').removeClass("stopActive");
    //$('#st_'+HSV_TT.ui.nextStop).addClass("stopActive");

    // disable until we make it smoother
    //HSV_TT.map.nextStopMark(stopTable[seqNum-1].geometry.coordinates);
};

HSV_TT.ui.getStops = function (routename) {

    // NOTE: allStops is not defined any where. I'm not sure how this function
    // works.
    var _stops = $.grep(allStops.features, function (o) {
        return o.properties.routename === routename;
    });

    // NOTE: should we be returning orderedStops here? If not, then why sort
    // the stops?
    var orderedStops = _stops.sort(function (a, b) {
        return a.properties.stop_sequence - b.properties.stop_sequence;
    });
    return _stops;
};

HSV_TT.ui.getRoutes = function (routename) {
    // NOTE: allRoutes is not defined any where. I'm not sure how this function
    // works.
    var _routes = $.grep(allRoutes.features, function (o) {
        return o.properties.routename === routename;
    });
    return _routes;
};
