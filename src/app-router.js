const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send({
        title: 'CERVADUINO API',
        version: '2.0.0',
    });
});

module.exports = router;
