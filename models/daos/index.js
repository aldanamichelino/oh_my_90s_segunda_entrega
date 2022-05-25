const User = require('./users/UserDaoMongo')
const Cart = require('./carts/CartDaoMongo');
const Product = require('./products/ProductDaoMongo');

module.exports = {
    User,
    Cart,
    Product
}
