const OrderDTO = require('../models/dtos/Order.dto');
const DAOSFactory = require('../models/daos/Daos.factory');
require('dotenv').config();
const { DATA_SOURCE}  = require('../config');

class OrderRepository {
  constructor(){
    this.order = DAOSFactory.getDAOS(DATA_SOURCE).orderDao;
  }

  async save(object) {
    const newOrderDTO = new OrderDTO(object);
    return await this.order.save(newOrderDTO);
  }

  async count() {
    return await this.order.count();
  }

  async getOrdersByEmail(email){
    return await this.order.getOrdersByEmail(email);
  }
}

module.exports = {
  OrderRepository
}