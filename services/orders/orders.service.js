const { OrderRepository } = require('../../repositories/orders.repository');

class OrderService {
  constructor() {
      this.orderDAO = new OrderRepository;
  }

  async getOrdersByEmail(email){
    return await this.orderDAO.getOrdersByEmail(email);
  }

}

module.exports = OrderService;