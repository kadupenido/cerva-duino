const five = require("johnny-five");
const ports = require('./ports');

let _board;
let _debug

function initialize(boardI, debug) {
    _board = boardI;
    _debug = debug

    _board.pinMode(ports.bkResistance, five.Pin.PWM);
    _board.analogWrite(ports.bkResistance, 0);

    _debug('BK Resistance ready...');
}

function setPower(power) {
    _board.analogWrite(ports.bkResistance, power);
}

module.exports = {
    initialize: initialize,
    power: setPower
}