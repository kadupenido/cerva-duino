const five = require("johnny-five");
const ports = require('./ports');

let _recirculationRelay = {};let _debug;

function initialize(debug) {
    _debug = debug;

    _recirculationRelay = new five.Relay(ports.recirculationRelay);
    _recirculationRelay.close();

    _debug('Recirculation Relay ready...');
}

function open() {
    _recirculationRelay.open();
}

function close() {
    _recirculationRelay.close();
}

module.exports = {
    initialize: initialize,
    open: open,
    close: close
}