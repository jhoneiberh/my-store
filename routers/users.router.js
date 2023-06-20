/* eslint-disable no-unused-vars */
const router = require('express').Router();
const faker = require('@faker-js/faker');


router.get('/users', (request, response) => {
    const { limit, offset } = request.query;

    if (limit && offset) {
        response.json({ limit, offset });
    } else {
        response.send('No hay query params');
    }
});


module.exports = router;
