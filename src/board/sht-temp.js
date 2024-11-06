const five = require("johnny-five");

let _io;
let _debug;
let _shd;

function initialize(io, debug) {
    _io = io;
    _debug = debug
    _shd = new five.Multi({
        controller: "SHT31D",
        pin: "I2C"
    });

    _shd.on('data', function () {
        _io.emit('sht-data', {
            temperature: Math.round(this.thermometer.celsius * 100) / 100,
            humidity: this.hygrometer.relativeHumidity
        });
    });

    _shd.on('error', function (err) {
        console.error("Error reading sensor data:", err);
    });

    _debug('SHT31D temperature ready...');
}

module.exports = {
    initialize: initialize
};