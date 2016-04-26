//var config = require('config.json');
var geoConst = require('../data/geoConst.json');
var stopHitZone = [];

function between(point, floor, ceiling ) {
	var ret = false;
	if (point >= floor && point <= ceiling) {
		ret = true;
	}
	return ret;
}

function initStopZones() {
  console.log("building zones: " + stopHitZone.length); 
  var nb;	
  var len = geoConst.dtStopArray.length;
  for (var i = 1; i <= len; ++i) {
	  nb = setStopBounds(i); 
      stopHitZone.push(nb);
  }
  console.log("zones: " + stopHitZone.length);  
}

function checkPoint(point) {
	if (stopHitZone.length < 1) {
	  initStopZones();	
	}
	var r = 0;
	for (var i = 0; i < stopHitZone.length && r === 0; i++) {
		r = contains(point, stopHitZone[i]) ? stopHitZone[i].stop : 0;
	}
	console.log("returning: " + r);
	return r;
} 

function contains(point, bounds) {      //upper left, lower right coordinate
	var ret = (between(point[0], bounds.se[0],bounds.nw[0]) && between(point[1], bounds.nw[1],bounds.se[1]) );
	return ret;
}

function setStopBounds(seq){
	return rtnBounds = {"stop" : seq,
		                "nw" : [(geoConst.dtStopArray[seq-1][0])+.00018,(geoConst.dtStopArray[seq-1][1])-.00018], 
                        "se" : [(geoConst.dtStopArray[seq-1][0])-.00018,(geoConst.dtStopArray[seq-1][1])+.00018]} 
};

exports.checkPoint = checkPoint;
exports.contains = contains;
//exports.setStopBounds = setStopBounds;



