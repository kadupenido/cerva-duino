const five = require("johnny-five");
const ports = require('./ports');

let _coolingRelay = {};
let _debug;

function initialize(debug) {

    _debug = debug

    _coolingRelay = new five.Relay(ports.coolingRelay);
    _coolingRelay.close();

    _debug('Cooling Relay ready...');
}

function open() {
    _coolingRelay.open();
}

function close() {
    _coolingRelay.close();
}

module.exports = {
    initialize: initialize,
    open: open,
    close: close
}