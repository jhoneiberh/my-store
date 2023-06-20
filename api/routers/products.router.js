const router = require('express').Router();
const ProductService = require('../services/product.service');
const { validatorHandler } = require('../middlewares/validator.handler');

const cors = require('cors');



const {
    createProductSchema,
    updateProductSchema,
    getProductSchema,
} = require('../schemas/product.schema');

const productService = new ProductService();

router.get('/', async (request, response, next) => {
    try {
        let products = [];

        products = await productService.getProducts();

        response.json([...products]);
    } catch (error) {
        next(error); // vaya y ejecute un middleware de tipo error
    }
});

router.get('/filter', (request, response) => {
    response.send('Yo soy un filter');
});

router.get(
    '/:id',
    validatorHandler(getProductSchema, 'params'),
    async (request, response, next) => {
        try {
            const { id } = request.params;

            const product = await productService.getProduct(id);

            response.json(product);
        } catch (error) {
            next(error);
        }
    }
);

router.post(
    '/',
    validatorHandler(createProductSchema, 'body'),
    async (request, response) => {
        const body = request.body;

        const newProduct = await productService.createProduct(body);

        response.status(201).json({
            message: 'created',
            data: newProduct,
        });
    }
);

router.patch('/:id', (request, response) => {
    const { id } = request.params;
    const body = request.body;
    response.json({
        message: 'updated',
        data: body,
        id,
    });
});

router.put(
    '/:id',
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
    async (request, response, next) => {
        try {
            const { id } = request.params;
            const body = request.body;

            let product = await productService.updateProduct(id, body);

            response.json({
                message: 'updated',
                data: product,
                id,
            });
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id', async (request, response) => {
    const { id } = request.params;

    let deleteProduct = await productService.deleteProduct(id);

    response.json(deleteProduct);
});

module.exports = router;
