const five = require("johnny-five");
const ports = require('./ports');

let _board;
let _debug

function initialize(boardI, debug) {
    _board = boardI;
    _debug = debug

    _board.pinMode(ports.hltResistance, five.Pin.PWM);
    _board.analogWrite(ports.hltResistance, 0);

    debug('HLT Resistance ready...');
}

function setPower(power) {
    _board.analogWrite(ports.hltResistance, power);
}

module.exports = {
    initialize: initialize,
    power: setPower
}