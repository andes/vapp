import * as path from 'path';
import * as express from 'express';
import { initAPI } from '../api/initialize';

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
app.listen(80, function () {
    console.log('Inicio de ANDES en el puerto 80');
});
export = app;
