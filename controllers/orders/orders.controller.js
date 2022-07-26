const OrderService = require('../../services/orders/orders.service');
const { viewErrorHandler } = require('../../utils/viewErrors');
const { write } = require('../../winston/logger.config');

class OrdersController{
  constructor(){
    this.orderService = new OrderService;
    this.getOrdersByEmailController = this.getOrdersByEmailController.bind(this);
  }

  async getOrdersByEmailController(req, res){
    const user = req.user;

    if(user.email){
      try {
        const orders = await this.orderService.getOrdersByEmail(user.email);
        return res.render('main', {orders: orders, user: user, req: req});
      } catch (error) {
        write('error', error.message);
        viewErrorHandler(error, res);
      }
    }
  }

}

module.exports = OrdersController;