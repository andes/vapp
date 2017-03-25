import * as express from 'express';
import { initAPI } from '../api/initialize';

// Inicializa Express
let app = express();

// Inicializa la APP
app.use(express.static('../app/dist'));

// Inicializa la API
initAPI(app);

// Inicia el servidor
app.listen(80, function () {
    console.log('Inicio de ANDES en el puerto 80');
});
export = app;
