const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const {pool} = require('../libs/postgres-pooling');

class ProductService {
    constructor() {
        this.pool = pool;
        this.pool.on('error', (error) => console.error(error))
        this.products = [];
        this.generate();

    }

    generate() {
        const limit = 100;

        for (let index = 0; index < limit; index++) {
            this.products.push({
                id: faker.string.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.avatar(),
                isBlock: faker.datatype.boolean()
            });
        }
    }

    async getProducts() {
        const query = 'SELECT * FROM tasks';
        const tasks = await this.pool.query(query)
        return tasks.rows;
        // return this.products;
    }

    async createProduct(data) {
        const newProduct = {
            id: faker.string.uuid(),
            ...data,
        };
        return newProduct;
    }

    async getProduct(id) {
        // const name = this.getTotal();

        const product = this.products.find((product) => product.id === id);
        if (!product) {
            throw boom.notFound('Product Not Found');
        }
        if(product.isBlock)
        {
            throw boom.conflict('Product is Block')
        }
        return product;
    }

    async updateProduct(id, changes) {
        const index = this.products.findIndex((product) => product.id === id);

        if (index === -1) {
            // throw new Error('Product Not Found');
            throw boom.notFound('Product Not Found');
        }
        const product = this.products[index];
        /* Mantiene los valores anterios y aplica cambios con los valores entrantes */
        this.products[index] = {
            ...product,
            ...changes,
        };

        return this.products[index];
    }

    async deleteProduct(id) {
        const index = this.products.findIndex((product) => product.id === id);
        if (index === -1) {
            // throw new Error('product not found');
            throw boom.notFound('Product Not Found');
        }

        this.products.splice(index, 1);

        return {
            message: 'delete succesful',
        };
    }
}

module.exports = ProductService;
