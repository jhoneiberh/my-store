const router = require('express').Router();

router.get('/:categoryId/products/:productId', (request, response) => {
    const { categoryId, productId } = request.params;
    response.json({
        categoryId,
        productId,
        name: 'Product 2',
        price: 1300,
    });
});

module.exports = router;
