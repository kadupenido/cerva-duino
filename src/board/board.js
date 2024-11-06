const five = require("johnny-five");
const DataModel = require('./board-data.model');
const liquidPID = require('liquid-pid');

let _io;
let _debug;

const buzzer = require('./buzzer');
const current = require('./current');

const hltTemp = require('./hlt-temp');
const hltResistence = require('./hlt-resistance');

const mltTemp = require('./mlt-temp');
const mltResistence = require('./mlt-resistance');

const bkTemp = require('./bk-temp');
const bkResistence = require('./bk-resistance');

const recirculationRelay = require('./recirculation-relay');
const coolingRelay = require('./cooling-relay');

const shttemp = require('./sht-temp');

const board = new five.Board({port:'COM6', repl: false});

const pidHlt = new liquidPID({ Pmax: 255 });
const pidMlt = new liquidPID({ Pmax: 255 });

let _data = DataModel;

board.on("ready", boardReady);
board.on("fail", boardFail);

function boardReady() {

    buzzer.initialize(board, _debug);
    current.initialize(board, _io, _debug);

    hltTemp.initialize(_io, _debug);
    hltResistence.initialize(board, _debug);

    mltTemp.initialize(_io, _debug);
    mltResistence.initialize(board, _debug);

    bkTemp.initialize(_io, _debug);
    bkResistence.initialize(board, _debug);

    recirculationRelay.initialize(_debug);
    coolingRelay.initialize(_debug);

    shttemp.initialize(_io, _debug);

    board.loop(1000, boardLoop);

    _io.on('connection', ioConnection);

    _debug("Board ready...");
}

function boardFail(e) {
    _isReady = false;
    _debug(e)
}

function boardLoop() {
    hltTempControl();
    mltTempControl();
    bkTempControl();
    recirculationControl();
    coolingControl();
}

function hltTempControl() {

    let correcao = 0;

    pidHlt.setPoint(_data.hlt.setPoint);

    if (_data.hlt.resistencia) {
        correcao = pidHlt.calculate(hltTemp.temp());
        //_debug(`HLT -> SETPOINT: ${_data.hlt.setPoint} - TEMP: ${hltTemp.temp()} - P: ${correcao}`);
    }

    hltResistence.power(correcao);
}

function mltTempControl() {

    let correcao = 0;

    pidMlt.setPoint(_data.mlt.setPoint)

    if (_data.mlt.resistencia) {
        correcao = pidMlt.calculate(mltTemp.temp());
        //_debug(`MLT -> SETPOINT: ${_data.mlt.setPoint} - TEMP: ${mltTemp.temp()} - P: ${correcao}`);
    }

    mltResistence.power(correcao);
}

function bkTempControl() {
    if (_data.bk.resistencia) {
        bkResistence.power(_data.bk.potencia);
    } else {
        bkResistence.power(0);
    }
}

function recirculationControl() {
    if (_data.mlt.recirculacao) {
        recirculationRelay.open();
    } else {
        recirculationRelay.close();
    }
}

function coolingControl() {
    if (_data.bk.resfriamento) {
        coolingRelay.open();
    } else {
        coolingRelay.close();
    }
}

function ioConnection(socket) {

    socket.on('hlt-setpoint', function (val) {
        _data.hlt.setPoint = val;
        _debug('HLT setpoint: ', val);
    });

    socket.on('hlt-resistencia', function (val) {
        _data.hlt.resistencia = val;
        _debug('HLT resistência: ', val ? 'ON' : 'OFF');
    });

    socket.on('mlt-setpoint', function (val) {
        _data.mlt.setPoint = val;
        _debug('MLT setpoint: ', val);
    });

    socket.on('mlt-resistencia', function (val) {
        _data.mlt.resistencia = val;
        _debug('MLT resistência: ', val ? 'ON' : 'OFF');
    });

    socket.on('mlt-recirculacao', function (val) {
        _data.mlt.recirculacao = val;
        _debug('MLT recirculação: ', val ? 'ON' : 'OFF');
    });

    socket.on('bk-potencia', function (val) {
        _data.bk.potencia = val;
        _debug('BK potência: ', val);
    });

    socket.on('bk-resistencia', function (val) {
        _data.bk.resistencia = val;
        _debug('BK resistência: ', val ? 'ON' : 'OFF');
    });

    socket.on('bk-resfriamento', function (val) {
        _data.bk.resfriamento = val;
        _debug('BK resfriamento: ', val ? 'ON' : 'OFF');
    });

    socket.on('buzzer', function (val) {
        if (val) {
            buzzer.play();

        } else {
            buzzer.stop();
        }

        _debug('Buzzer: ', val ? 'ON' : 'OFF');
    });
}

module.exports = function (io, debug) {
    _io = io;
    _debug = debug
};