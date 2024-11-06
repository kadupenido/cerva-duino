const five = require("johnny-five");
const ports = require('./ports');

let _debug;

function initialize(boardI, debug) {
    board = boardI;
    _debug = debug;

    board.pinMode(ports.mltResistance, five.Pin.PWM);
    board.analogWrite(ports.mltResistance, 0);

    _debug('MLT Resistance ready...');
}

function setPower(power) {
    board.analogWrite(ports.mltResistance, power);
}

module.exports = {
    initialize: initialize,
    power: setPower
}