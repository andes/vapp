"use strict";

var express = require('express');
var path = require('path');
var app = express();

app.use('/', express.static(path.join(__dirname, '../../app')));

app.use('/node_modules', express.static(path.join(__dirname, '../../app/node_modules')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../app/index.html'));
});

 // app.listen(3006, function () {
 //     console.log('App listening en el puerto 3006');
 // });

module.exports = app
