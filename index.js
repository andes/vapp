"use strict";
var fs = require('fs');
var path = require("path");
var express = require("express");
var initialize_1 = require("../api/initialize");
var websockets_1 = require("../api/websockets");
var httpPort = process.env.HTTP_PORT || 80;
var httpsPort = process.env.HTTPS_PORT || 443;
var KEY_PEM = process.env.KEY_PEM || 'key.pem';
var SERVER_CERT = process.env.SERVER_CERT || 'server.crt';
var useSSL = (fs.existsSync(KEY_PEM) && fs.existsSync(SERVER_CERT));
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
var http = require('http');
var server = http.createServer(app);
server.listen(httpPort, function () {
    console.log('Inicio de ANDES en el puerto 80');
});
if (!useSSL) {
    websockets_1.Websockets.initialize(server);
}
/**
 * Ejemplos para crear certificados
 * openssl req -newkey rsa:2048 -new -nodes -keyout key.pem -out csr.pem
 * openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out server.crt
 */
// Si existen los certificados levantamos el server con HTTPS
if (useSSL) {
    var https = require('https');
    var httpsServer = https.createServer({
        key: fs.readFileSync(KEY_PEM),
        cert: fs.readFileSync(SERVER_CERT)
    }, app);
    httpsServer.listen(httpsPort, function () {
        console.log('Inicio de ANDES en el puerto 443');
    });
    websockets_1.Websockets.initialize(httpsServer);
}
module.exports = app;
//# sourceMappingURL=index.js.map