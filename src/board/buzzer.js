const five = require("johnny-five");
const ports = require('./ports');

let board = {};
let _debug;

let _buzzer = {}
let _playingBuzzer = false;

function initialize(board, debug) {
    board = board;
    _buzzer = new five.Pin(ports.buzzer);
    _debug = debug
    _debug('Buzzer ready...');
}

function buzzer(on = false) {
    if (_playingBuzzer) {
        if (on) {
            _buzzer.low();
            board.wait(300, () => buzzer(!on));
        } else {
            _buzzer.high();
            board.wait(300, () => buzzer(!on));
        }
    } else {
        _buzzer.low();
    }
}

function playBuzzer() {
    _playingBuzzer = true;
    buzzer();
}

function stopBuzzer() {
    _playingBuzzer = false;
}

module.exports = {
    initialize: initialize,
    play: playBuzzer,
    stop: stopBuzzer
}