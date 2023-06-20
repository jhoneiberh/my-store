const boom = require('@hapi/boom');

/**
 * Validaciones de datos con Joi
*/
function validatorHandler(schema, property) {
    return (request, response, next) => {
        const data = request[property];
        const { error } = schema.validate(data, { abortEarly: false});
        if (error) {
            next(boom.badRequest(error))
        }
        else
        {
            next();
        }
    };
}

module.exports = { validatorHandler };
