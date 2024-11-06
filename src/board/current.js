const five = require("johnny-five");
const ports = require('./ports');

let _board = {};
let _io;
let _debug;

const numberOfSamples = 50;
let i = 0;
let offsetI = 512;
let sumI = 0;
let filteredI = 0;

let _current = 0;
let _power = 0;
let _consumption = 0;

function initialize(boardI, io, debug) {

    _board = boardI;
    _io = io;
    _debug = debug;

    _board.pinMode(ports.current.pin, five.Pin.INPUT);
    _board.analogRead(ports.current.pin, function (voltage) { readCurrent(voltage) });

    _board.loop(1000, function () {
        _consumption += (_power / 3600) / 1000;
        _io.emit('current-data', getData());
    });

    _debug('Current ready...');
}

function getData() {
    return {
        consumo: Math.round(_consumption * 100) / 100,
        corrente: Math.round(_current * 100) / 100,
        potencia: Math.round(_power),
    }
}

function readCurrent(voltage) {

    if (i < numberOfSamples) {

        offsetI = (offsetI + (voltage - offsetI) / 1024);
        filteredI = voltage - offsetI;
        sumI += filteredI * filteredI;
        i++;

    } else {

        let iRatio = 16.67 * ((4541 / 1000.0) / (1024));
        let current = iRatio * Math.sqrt(sumI / numberOfSamples);

        _current = current > 0.045 ? current : 0;
        _power = _current * ports.current.voltage;

        sumI = 0;
        i = 0;
    }
}

module.exports = {
    initialize: initialize
};