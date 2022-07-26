const MongoContainer = require("../../../containers/MongoContainer");
const CartSchema = require('../../../schemas/Cart.schema');
const { CART_STATUSES } = require('../../../../constants/api');
const { write } = require('../../../../winston/logger.config');
const { STATUS } = require('../../../../constants/api');


class CartDaoMongo extends MongoContainer {
    constructor(){
      super('carts', CartSchema);
    }

    async createNewCart(user, product_id, quantity){
        try{
          const cart = await this.getCartByUserId(user._id, CART_STATUSES.CART_IN_PROCESS);
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
              user_id: user._id,
              user_email: user.email,
              user_address: user.address,
              status: 'in process'
            };
            return this.save(newCart);
          }
        } catch(error){
          write('error', `Error: ${error.message}`);
          throw new Error(`${STATUS.INTERNAL_ERROR.tag}, code: ${STATUS.INTERNAL_ERROR.code}, ${error.message}`);
        }
    }

    async getCartByUserId(user_id, status){
      try{
        return await this.model.findOne({'user_id' : user_id, 'status': status}, {__v: 0});
      } catch (error){
        write('error', `Error: ${error.message}`);
        throw new Error(`${STATUS.INTERNAL_ERROR.tag}, code: ${STATUS.INTERNAL_ERROR.code}, ${error.message}`);
      }

    }

    async deleteProductFromCart(user_id, product_id){
      try {  
        let cart = await this.getCartByUserId(user_id, CART_STATUSES.CART_IN_PROCESS);
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
        write('error', `Error: ${error.message}`);
        throw new Error(`${STATUS.INTERNAL_ERROR.tag}, code: ${STATUS.INTERNAL_ERROR.code}, ${error.message}`);
      }
    }

}

module.exports = CartDaoMongo;