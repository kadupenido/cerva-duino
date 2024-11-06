const five = require("johnny-five");
const ports = require('./ports');
let _io;

let _hltTemp = {};
let _temp = 0;
let _debug;

function initialize(io, debug) {

    _io = io;
    _debug = debug

    _hltTemp = new five.Thermometer({
        controller: ports.hltTemp.controller,
        pin: ports.hltTemp.pin,
        address: ports.hltTemp.address
    });

    _hltTemp.on("change", function () {
        _temp = this.celsius;
        _io.emit('hlt-temp', Math.round(_temp * 10) / 10);
    });

    _hltTemp.on("error", (error) => {
        console.error("Error reading temperature:", error.message);
    });

    _debug('HLT temperature ready...');
}

function getTemp() {
    return _temp;
}

module.exports = {
    initialize: initialize,
    temp: getTemp
}