HSV_TT.sockets = {};

HSV_TT.sockets.init = function () {
    var socket = io.connect();
    var location = { lat: null, lng: null }; // this was reversed. Western Hemisphere is negative.
    var trolleyOn = true;

    function updateMap(data) {
        data.forEach(function (point) {
            if (point.lat && point.long) {
                location.lat = point.lat;
                location.lng = point.long;
                HSV_TT.map.updateLocationMarker(point.id, location);
            } else {
                HSV_TT.map.removeLocationMarker(point.id);
                HSV_TT.removeBusMapMarker(point.id);
            }
        });
    }

    function receiveUpdates() {
        socket.on('made connect', function (data) {
            HSV_TT.ui.setNextStop(data.nextSeq, data.route, data.id);
        });

        socket.on('location update', function (data) {
            updateMap(data);
        });

        socket.on('trolley off', function () {
            if (trolleyOn) {
                HSV_TT.ui.showNotAvail();
            }
            trolleyOn = false;
        });

        socket.on('next stop', function (data) {
            if (data) {
                HSV_TT.ui.setNextStop(data.seq, data.route, data.id);
            }
        });
    }

    function updateLocation() {
        socket.emit('get location');
    }

    receiveUpdates();

    setInterval(function () { updateLocation(); }, 3000);
};
