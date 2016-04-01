'use strict';

//var config = require('config.json');
var geoConst = require('../data/geoConst.json');

function between(point, floor, ceiling) {
    if (point >= floor && point <= ceiling) {
        return true;
    }
    return false;
}

function contains(point, bounds) {      //upper left, lower right coordinate
    return (between(point[0], bounds.se[0], bounds.nw[0])
        && between(point[1], bounds.nw[1], bounds.se[1]));
}

function setStopBounds(seq) {
    return {
        nw: [(geoConst.dtStopArray[seq][0]) + 0.00018, (geoConst.dtStopArray[seq][1]) - 0.00018],
        se: [(geoConst.dtStopArray[seq][0]) - 0.00018, (geoConst.dtStopArray[seq][1]) + 0.00018]
    };
}

exports.contains = contains;
exports.setStopBounds = setStopBounds;
