"use strict";
var express = require("express");
var initialize_1 = require("../api/initialize");
// Inicializa Express
var app = express();
// Inicializa la APP
app.use(express.static('../app/dist'));
// Inicializa la API
initialize_1.initAPI(app);
// Inicia el servidor
app.listen(80, function () {
    console.log('Inicio de ANDES en el puerto 80');
});
module.exports = app;
//# sourceMappingURL=index.js.map