const MongoContainer = require("../../containers/MongoContainer");
const { Schema } = require('mongoose');

const cartSchema = Schema({
    products: [{type: Object, ref: 'products'}],
    user_id: {type: Number, ref: 'users'},
    status: {type: String},
    timestamp: {type: Date, min: Date.now()}
});


class CartDaoMongo extends MongoContainer {
    constructor(){
        super('carts', cartSchema);
    }

    async createNewCart(user_id, product_id){
        try{
            const cart = await this.model.findOne({'user_id' : user_id, 'status': 'in process'}, {__v: 0}).lean();

            if(cart){
                cart.products.push(product_id);
                return cart;
            } else {
                const newCart = {
                    products : [product_id],
                    user_id: req.user._id,
                    status: 'in process'
                };

                return this.save(newCart);
            }

        } catch(error){
            console.log(error.message);
        }
    }

}

module.exports = CartDaoMongo;