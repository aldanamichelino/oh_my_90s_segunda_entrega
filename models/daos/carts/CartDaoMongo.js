const MongoContainer = require("../../containers/MongoContainer");
const { Schema } = require('mongoose');
const {cart_statuses } = require('../../../config');
const { write } = require('../../../config');


const cartSchema = Schema({
    products: [
        {
            product_id : {type: Schema.Types.ObjectId, ref: 'products'},
            quantity: {type: Number}
        }
    ],
    user_id: {type: Schema.Types.ObjectId, ref: 'users'},
    status: {type: String},
    timestamp: {type: Date, min: Date.now()}
});


class CartDaoMongo extends MongoContainer {
    constructor(){
        super('carts', cartSchema);
    }

    async createNewCart(user_id, product_id, quantity){
        try{
            let cart = await this.getCartByUserId(user_id, cart_statuses.CART_IN_PROCESS);

            if(cart){
                const existingProductIndex = cart.products.findIndex((product) => product.product_id == product_id);

                if(existingProductIndex > -1){
                    cart.products[existingProductIndex].quantity += +quantity;
                } else {
                    cart.products.push({product_id, quantity});
                }

                this.update(cart._id, cart);
                return cart;
            } else {
                const newCart = {
                    products : [{product_id, quantity}],
                    user_id: user_id,
                    status: 'in process'
                };

                return this.save(newCart);
            }

        } catch(error){
            write('error', `Error: ${error.message}`);
        }
    }

    async getCartByUserId(user_id, status){

        try{
            const cart = await this.model.findOne({'user_id' : user_id, 'status': status}, {__v: 0});

            if(!cart){
                write('error', 'El documento solicitado no existe en nuestra base de datos');
                throw new Error('El documento solicitado no existe en nuestra base de datos');
            } else {
                return cart;
            }
        } catch (error){
            write('error', `Error: ${error.message}`);
        }

    }

    async deleteProductFromCart(user_id, product_id){
        try {  

            let cart = await this.getCartByUserId(user_id, cart_statuses.CART_IN_PROCESS);

            if (!cart) {
                return { success: false, error: 'Carrito no encontrado' };
            }
        
            const existingProductIndex = cart.products.findIndex((product) => product.product_id == product_id);
    
            if(existingProductIndex > -1) {
                cart.products.splice(existingProductIndex, 1);
            }
            
            this.update(cart._id, cart);

            return cart;
    
        } catch (error) {
            throw new Error(error.message);
        }
    }

}

module.exports = CartDaoMongo;