let fs = require('fs');

import * as path from 'path';
import * as express from 'express';
import { initAPI } from '../api/initialize';
import { Websockets } from '../api/websockets';

let httpPort = process.env.HTTP_PORT || 80;
let httpsPort = process.env.HTTPS_PORT || 443;

let KEY_PEM = process.env.KEY_PEM || 'key.pem';
let SERVER_CERT = process.env.SERVER_CERT || 'server.crt';
let useSSL = (fs.existsSync(KEY_PEM) && fs.existsSync(SERVER_CERT));

// Inicializa Express
let app = express();

// Inicializa la APP
app.use(express.static('../app/dist'));

// Inicializa la API
initAPI(app);

// Permite routing de HTML5 / Angular
app.all('*', (req: any, res: any) => {
    // Send HTML or JSON
    if (/json/i.test(req.get('Content-Type'))) {
        res.status(404);
        res.send({
            error: 404,
            message: 'Not Found'
        });
    } else {
        res.status(200).sendFile(path.join(__dirname, '../app/dist/index.html'));
    }
});

// Inicia el servidor
let http = require('http');
let server = http.createServer(app);
server.listen(httpPort, function () {
    console.log('Inicio de ANDES en el puerto 80');
});

if (!useSSL) {
    Websockets.initialize(server);
}


/**
 * Ejemplos para crear certificados
 * openssl req -newkey rsa:2048 -new -nodes -keyout key.pem -out csr.pem
 * openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out server.crt
 */

// Si existen los certificados levantamos el server con HTTPS

if (useSSL) {
    let https = require('https');
    let httpsServer = https.createServer({
        key: fs.readFileSync(KEY_PEM),
        cert: fs.readFileSync(SERVER_CERT)
    }, app);
    httpsServer.listen(httpsPort, function () {
        console.log('Inicio de ANDES en el puerto 443');
    });
    Websockets.initialize(httpsServer);
}

export = app;
