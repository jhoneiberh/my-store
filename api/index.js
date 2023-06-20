const express = require('express');

const routerApi = require('./routers');

const cors = require('cors');

const app = express();

const port = process.env.PORT || 3000;

const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:4200',
    'http://localhost:5500',
    'http://127.0.0.1:5500',
];
const options = {
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true);
        }
        if (allowedOrigins.includes(origin)) {
            callback(null, true); // si está en la lista, permitido
        } else {
            callback(new Error('No permitido'));
        }
    },
};

// app.use(
//     cors({
//         origin: function (origin, callback) {
//             if (!origin) {
//                 return callback(null, true);
//             }
//             if (allowedOrigins.indexOf(origin) === -1) {
//                 let message =
//                     'The CORS policy for this site does not ' +
//                     'allow access from the specified Origin.';
//                 return callback(new Error(message), false);
//             }
//             return callback(null, true);
//         },
//     })
// );

app.use(cors(options));

app.use(express.json());

const {
    errorHandler,
    logErrors,
    boomErrorHandler,
} = require('./middlewares/error.handler');

routerApi(app);

app.get('/api', (request, response) => {
    // response.send('<h1>Hola express</h1>');
    response.json({ Hola: 'express' });
});

app.get('/new_route', (request, response) => {
    response.json({ saludo: 'Hola nueva ruta' });
});
// Orden en el que van a ejecutar
app.use(logErrors, boomErrorHandler, errorHandler);

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Corriendo en puerto', port);
});
