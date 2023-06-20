const Joi = require('joi');

/**
 * Normalmente se crear los objetos con sus respectivos campos.
 * Sin embargo, también se puede llegar a definir directamente los campos.
 */
const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri().min(5);

const createProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    image: image
});

const updateProductSchema = Joi.object({
    name: name,
    price: price,
    image: image,
});

const deleteProductSchema = Joi.object({
    id: id.required(),
});

const getProductSchema = Joi.object({
    id: id.required(),
});

module.exports = {
    createProductSchema,
    updateProductSchema,
    deleteProductSchema,
    getProductSchema,
};
