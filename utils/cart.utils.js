const { Product } = require('../models/daos/index');
const product = new Product;

const getCartProducts = async (ids) => {

    return ids.map(async (id) => {
        const thisFunction = async () => {
            return await product.getById(id) 
        }

        return await thisFunction();
    })
}


module.exports = {
    getCartProducts
}