const { Client } = require('pg');

async function getConnection() {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'nico',
        password: '123',
        database: 'my-store',
    });

    await client.connect();
    return client;
}

module.exports = { getConnection };
