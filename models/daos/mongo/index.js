const UserDaoMongo = require('./users/UserDaoMongo')
const CartDaoMongo = require('./carts/CartDaoMongo');
const ProductDaoMongo = require('./products/ProductDaoMongo');
const OrderDaoMongo = require('./orders/OrderDaoMongo');

module.exports = {
    UserDaoMongo,
    CartDaoMongo,
    ProductDaoMongo,
    OrderDaoMongo
}
