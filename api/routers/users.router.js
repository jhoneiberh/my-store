/* eslint-disable no-unused-vars */
const router = require('express').Router();
const faker = require('@faker-js/faker');
const UserService = require('../services/user.service');

const userService = new UserService();

/* router.get('/', (request, response) => {
    const { limit, offset } = request.query;

    if (limit && offset) {
        response.json({ limit, offset });
    } else {
        response.send('No hay query params');
    }
}); */

router.get('/', async (request, response, next) => {
    try {
        const users = await userService.getUsers();
        response.json(users);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
