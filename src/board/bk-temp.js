const five = require("johnny-five");
const ports = require('./ports');

let _io;
let _debug;
let _bkTemp = {};

function initialize(io, debug) {

    _io = io;
    _debug = debug;

    _bkTemp = new five.Thermometer({
        controller: ports.bkTemp.controller,
        pin: ports.bkTemp.pin,
        address: ports.bkTemp.address
    });

    _bkTemp.on("change", function () {
        _io.emit('bk-temp', Math.round(this.celsius * 10) / 10);
    });

    _bkTemp.on("error", (error) => {
        console.error("Error reading temperature:", error.message);
    });

    _debug('BK temperature ready...');
}

module.exports = {
    initialize: initialize
};