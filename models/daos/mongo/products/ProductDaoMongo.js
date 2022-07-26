const MongoContainer = require("../../../containers/MongoContainer");
const ProductSchema = require('../../../schemas/Product.schema');
const { write } = require('../../../../winston/logger.config');
const { STATUS } = require('../../../../constants/api');


class ProductDaoMongo extends MongoContainer {
    constructor(){
      super('products', ProductSchema);
    }

    async filterBy(field, value){
      const object = {};
      object[field] = value;
      try{
        const documents = await this.model.find(object, {__v: 0}).lean();
        return documents;
      } catch(error){
        write('error', `Error: ${error.message}`);
        throw new Error(`${STATUS.INTERNAL_ERROR.tag}, code: ${STATUS.INTERNAL_ERROR.code}, ${error.message}`);
      }
    }
}

module.exports = ProductDaoMongo;