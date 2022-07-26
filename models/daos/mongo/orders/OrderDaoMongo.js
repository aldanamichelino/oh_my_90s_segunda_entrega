const MongoContainer = require("../../../containers/MongoContainer");
const OrderSchema = require("../../../schemas/Order.schema");
const { write } = require('../../../../winston/logger.config');
const { STATUS } = require('../../../../constants/api');

class OrderDao extends MongoContainer{
  constructor(){
    super('orders', OrderSchema)
  }

  async count(){
    try{
      return await this.model.countDocuments();
    } catch(error) {
      write('error', `Error: ${error.message}`);
        throw new Error(`${STATUS.INTERNAL_ERROR.tag}, code: ${STATUS.INTERNAL_ERROR.code}, ${error.message}`);
    }
  }

  async getOrdersByEmail(email){
    try{
      return await this.model.find({email}, {__v: 0}).lean();
    } catch(error) {
      write('error', `Error: ${error.message}`);
        throw new Error(`${STATUS.INTERNAL_ERROR.tag}, code: ${STATUS.INTERNAL_ERROR.code}, ${error.message}`);
    }
  }
}

module.exports = OrderDao;