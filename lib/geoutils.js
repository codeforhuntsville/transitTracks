//var config = require('config.json');
var geoConst = require('../data/geoConst.json');

function between(point, floor, ceiling ) {
	var ret = false;
	if (point >= floor && point <= ceiling) {
		ret = true;
	}
	return ret;
} 

function contains(point, bounds) {      //upper left, lower right coordinate
	var ret = (between(point[0], bounds.se[0],bounds.nw[0]) && between(point[1], bounds.nw[1],bounds.se[1]) );
	return ret;
}

function setStopBounds(seq){
	return rtnBounds = {"nw" : [(geoConst.dtStopArray[seq][0])+.00018,(geoConst.dtStopArray[seq][1])-.00018], 
                        "se" : [(geoConst.dtStopArray[seq][0])-.00018,(geoConst.dtStopArray[seq][1])+.00018]} 
};

exports.contains = contains;
exports.setStopBounds = setStopBounds;



