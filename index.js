    var express = require('express'),
    path = require('path'),
    app = express();
    var swaggerJSDoc = require('swagger-jsdoc');

    // Config app, VERIFICAR que index.js de la API NO TENGA LISTEN (app.listen)
    var swaggerDefinition = {
        info: {
            title: 'API ANDES',
            version: '1.0.0',
            description: 'APIs de tablas maestras ANDES',
        },
        host: 'localhost:81',
        basePath: '/api',
        definitions: {
            "referencia": {
                "type": "object",
                "properties": {
                    "id": { "type": "string" },
                    "nombre": { "type": "string" }
                }
            },
            "ubicacion": {
                "type": "object",
                "properties": {
                    "barrio": {
                        $ref: '#/definitions/referencia'
                    },
                    "localidad": {
                        $ref: '#/definitions/referencia'
                    },
                    "provincia": {
                        $ref: '#/definitions/referencia'
                    },
                    "pais": {
                        $ref: '#/definitions/referencia'
                    }
                }
            },
            "direccion": {
                "type": "object",
                "properties": {
                    "valor": { "type": "string" },
                    "codigoPostal": { "type": "string" },
                    "ubicacion": {
                        $ref: '#/definitions/ubicacion'
                    },
                    "ranking": { "type": "number" },
                    "geoReferencia": { "type": "array",
                        "items": { "type": "number" } },
                    "ultimaActualizacion": { "type": "string", "format": "date" },
                    "activo": { "type": "boolean" }
                }
            },
            "contacto": {
                "type": "object",
                "properties": {
                    "proposito": { "type": "String" },
                    "nombre": { "type": "String" },
                    "apellido": { "type": "String" },
                    "tipo": { "type": "String",
                        "enum": ["telefonoFijo", "telefonoCelular", "email"]
                    },
                    "valor": { "type": "string" },
                    "activo": { "type": "boolean" }
                }
            }
        }
    };
    // options for the swagger docs
    var options = {
        // import swaggerDefinitions
        swaggerDefinition: swaggerDefinition,
        // path to the API docs
        apis: ['../api/routes/*.js'],
    };
    // initialize swagger-jsdoc
    var swaggerSpec = swaggerJSDoc(options);



var port = 81;
app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app
    .use('/', require('../api/index.js'))
    //.use('/', require('../app/app.js'))
    .use('/', require('./app/tablasMaestras.js'))
    .listen(port, function() {
        console.log('vApp running on port %d on %s mode', port, app.get('env'));
    });




// Not found: catch 404 and forward to error handler


app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use(function(err, req, res, next) {
    // Parse err
    var e;
    if (!isNaN(err)) {
        e = new Error(err == 400 ? "Parámetro incorrecto" : "No encontrado");
        e.status = err;
        err = e;
    } else if (typeof err == "string") {
        e = new Error(err);
        e.status = 400;
        err = e;
    }

    // Send HTML or JSON
    res.status(err.status || 500);
    var response = {
        message: err.message,
        error: (app.get('env') === 'development') ? err : null
    };

    if (req.accepts('application/json'))
        res.send(response);
    else
        res.render('error', response);
});

//  View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
