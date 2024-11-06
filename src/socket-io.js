const socketIo = require('socket.io');

let _io;

module.exports = function (server, debug) {
    if (server) {
        _io = new socketIo.Server(server, {
            cors:{
                origin:'*'
            }
        });

        _io.on('connection', function (socket) {
            debug('Client connected...');
        });
    }
    return _io;
};