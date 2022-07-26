const express = require('express');
const router = express.Router();
const OrderController = require('../../controllers/orders/orders.controller');
const auth = require('../../middlewares/auth');

class OrderRoutes{
  constructor(){
    this.controller = new OrderController();
  }

  initialize(prefix = ""){
    router.get(`${prefix}/`, auth, this.controller.getOrdersByEmailController);

    return router;
  }
}

module.exports = new OrderRoutes();

