<<<<<<< HEAD
var express = require('express'),
    path = require('path'),
    app = express();

// Config app
var port = 81;
app
    //.use('/lib', express.static(path.join(__dirname, '../lib')))
    //.use('/auth', require('../auth/app.js'))
    .use('/api/internacion', require('../api-internacion/app.js'))
    .use('/app/internacion', require('../app-internacion/app.js'))
=======
    var express = require('express'),
    path = require('path'),
    app = express();

    // Config app, VERIFICAR que index.js de la API NO TENGA LISTEN (app.listen)

var port = 81;
app
    .use('/', require('../api/index.js'))
    //.use('/', require('../app/app.js'))
    .use('/', require('./app/tablasMaestras.js'))
>>>>>>> develop
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
<<<<<<< HEAD
app.set('view engine', 'ejs');
=======
app.set('view engine', 'ejs');
>>>>>>> develop
