const CartService = require('../../services/carts/carts.service');
const ProductService = require('../../services/products/products.service');
require('dotenv').config();
const {write} = require('../../winston/logger.config');
const { viewErrorHandler } = require('../../utils/viewErrors');

class CartsController{
    constructor(){
      this.cartService = new CartService;
      this.productService = new ProductService;
      this.getCartController = this.getCartController.bind(this);
      this.addProductToCartController = this.addProductToCartController.bind(this);
      this.deleteProductFromCartController = this.deleteProductFromCartController.bind(this);
      this.purchaseCartController = this.purchaseCartController.bind(this);
    }

    async getCartController(req, res){
      try{
        const user = req.user;
        const cartData = await this.cartService.getCartByUserId(user);
        if(cartData){
          return res.render('main', {productsInCart: cartData.productsInCartData, totalSpent: cartData.totalSpent, user: user, req: req});
        } else {
          return res.render('main', {productsInCart: [], user: user, req: req});
        }
      } catch(error){
        write('error', error.message);
        viewErrorHandler(error, res);
      }
    }

    async addProductToCartController(req, res){
      try {
        const { params: { product_id }, body: { quantity } } = req;
        const user = req.user;
        await this.cartService.createCart(user, product_id, quantity)
        return res.status(200).redirect('/api/productos');
      } catch (error) {
        write('error', error.message);
        viewErrorHandler(error, res);
      }
    }

    async deleteProductFromCartController(req, res){
      try {
        const { product_id } = req.params;
        const user_id = req.user._id;
        if(product_id){
          const response = await this.cartService.deleteProductFromCart(user_id, product_id)
          return res.status(200).json({success: true, response: response});
        } else {
          const error = { message : "Por favor, ingrese un id válido"};
          write('error', error.message);
          viewErrorHandler(error, res);
        }
      } catch (error) {
          write('error', error.message);
          viewErrorHandler(error, res);
      }
    }

    async purchaseCartController(req, res){
      try {
          const user = req.user;
          if(user){
            await this.cartService.purchaseCart(user);
            res.redirect('/api/carrito');
          }
        } catch (error) {
          write('error', error.message);
          viewErrorHandler(error, res);
      }
    }
}

module.exports = CartsController;
