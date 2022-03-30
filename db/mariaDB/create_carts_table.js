const { mariaDB } = require('../../config');
const knex = require('knex')(mariaDB);

knex.schema.createTable('carts', table => {
    table.increments('id')
    table.uuid('product_id', 11).references('id').inTable('Products');
    table.timestamp('timestamp').defaultTo(knex.fn.now());
})
    .then(() => console.log('table created'))
    .catch((err) => {console.log(err); throw err})
    .finally(() => {
        knex.destroy();
    });