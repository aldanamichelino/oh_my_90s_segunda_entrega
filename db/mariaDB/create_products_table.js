const { mariaDB } = require('../../config');
const knex = require('knex')(mariaDB);

knex.schema.createTable('products', table => {
    table.increments('id')
    table.string('name').notNullable()
    table.string('description').notNullable()
    table.string('code').notNullable()
    table.string('image').notNullable()
    table.integer('price').notNullable()
    table.integer('stock').notNullable()
    table.timestamp('timestamp').defaultTo(knex.fn.now());
})
    .then(() => console.log('table created'))
    .catch((err) => {console.log(err); throw err})
    .finally(() => {
        knex.destroy();
    });