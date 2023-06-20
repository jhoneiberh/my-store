/**
 * Capturar cualquier error
 */
function logErrors(error, request, response, next) {
    // eslint-disable-next-line no-console
    console.log('log errors');
    // eslint-disable-next-line no-console
    console.error(error);
    next(error); // middleware de tipo error
}

/**
 * Detectar un error, y lo formatea para retornarlo al cliente
 * El punto final
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(error, request, response, next) {
    // eslint-disable-next-line no-console
    console.log('error handler');
    response.status(500).json({
        message: error.message,
        stack: error.stack,
    });
}

/**
 * Middleware de tipo boom
*/
function boomErrorHandler(error, request, response, next) {
    if (error.isBoom) {
        const { output } = error;
        response.status(output.statusCode).json(output.payload);
    } else {
        next(error);
    }
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
