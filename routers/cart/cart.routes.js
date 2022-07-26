const express = require('express');
const router = express.Router();
const CartsController = require('../../controllers/carts/carts.controller');
const auth = require('../../middlewares/auth');


class CartRoutes{
  constructor(){
    this.controller = new CartsController();
  }

  initialize(prefix = ""){
    router.get(`${prefix}/`, auth, this.controller.getCartController);
    router.post(`${prefix}/:product_id`, auth, this.controller.addProductToCartController);
    router.delete(`${prefix}/:product_id`, auth, this.controller.deleteProductFromCartController);
    router.get(`${prefix}/finalizarCompra`, auth, this.controller.purchaseCartController);

    return router;
  }
}

module.exports = new CartRoutes();