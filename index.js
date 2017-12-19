"use strict";
var path = require("path");
var express = require("express");
var initialize_1 = require("../api/initialize");
var websockets_1 = require("../api/websockets");
// Inicializa Express
var app = express();
// Inicializa la APP
app.use(express.static('../app/dist'));
// Inicializa la API
initialize_1.initAPI(app);
// Permite routing de HTML5 / Angular
app.all('*', function (req, res) {
    // Send HTML or JSON
    if (/json/i.test(req.get('Content-Type'))) {
        res.status(404);
        res.send({
            error: 404,
            message: 'Not Found'
        });
    }
    else {
        res.status(200).sendFile(path.join(__dirname, '../app/dist/index.html'));
    }
});
// Inicia el servidor
var server = app.listen(80, function () {
    console.log('Inicio de ANDES en el puerto 80');
});
websockets_1.Websockets.initialize(server);
module.exports = app;
//# sourceMappingURL=index.js.map