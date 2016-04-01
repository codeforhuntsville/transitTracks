var CronJob = require('cron').CronJob;

var tz = 'America/Chicago';

var trolleyActive = false;
var busesActive = false;
var uahBusActive = false;

//Seconds: 0-59
//Minutes: 0-59
//Hours: 0-23
//Day of Month: 1-31
//Months: 0-11
//Day of Week: 0-6

var trolleyStart = new CronJob({
    cronTime: '00 45 16 * * 5,6',
    onTick: function () {
        trolleyActive = true;
    },
    timeZone: tz
});

var trolleyDone = new CronJob({
    cronTime: '00 30 0 * * 0,6',
    onTick: function () {
        trolleyActive = false;
    },
    timeZone: tz
});

var busesStart = new CronJob({
    cronTime: '00 45 5 * * 0-6',
    onTick: function () {
        busesActive = true;
    },
    timeZone: tz
});

var busesDone = new CronJob({
    cronTime: '00 15 19 * * 0-6',
    onTick: function () {
        busesActive = false;
    },
    timeZone: tz
});

var uahBusStart = new CronJob({
    cronTime: '00 45 16 * * 5',
    onTick: function () {
        uahBusActive = true;
    },
    timeZone: tz
});

var uahBusDone = new CronJob({
    cronTime: '00 45 22 * * 5',
    onTick: function () {
        uahBusActive = false;
    },
    timeZone: tz
});

trolleyStart.start();
trolleyDone.start();
busesStart.start();
busesDone.start();
uahBusStart.start();
uahBusDone.start();

function isTrolleyActive() {
    return trolleyActive;
}

function areBusesActive() {
    return busesActive;
}

function isUahBusActive() {
    return uahBusActive;
}

exports.isTrolleyActive = isTrolleyActive;
exports.areBusesActive = areBusesActive;
exports.isUahBusActive = isUahBusActive;
