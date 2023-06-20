// eslint-disable-next-line no-unused-vars
const { faker } = require('@faker-js/faker');
// eslint-disable-next-line no-unused-vars
const boom = require('@hapi/boom');
const { pool } = require('../libs/postgres-pooling');

const { getConnection } = require('../libs/postgres');

class UserService {
    constructor() {
        this.pool = pool;
        this.pool.on('error', (error) => console.error(error));
    }

    async createUser(data) {
        return data;
    }

    async getUsers() {
        const query = 'SELECT * FROM tasks';
        const tasks = await this.pool.query(query);
        return tasks.rows;
    }

    async getUser(id) {
        return { id };
    }

    async update(id, changes) {
        return {
            id,
            changes,
        };
    }

    async delete(id) {
        return { id };
    }
}

module.exports = UserService;
