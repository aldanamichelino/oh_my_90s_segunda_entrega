const ProductDTO = require('../models/dtos/Product.dto');
const DAOSFactory = require('../models/daos/Daos.factory');
require('dotenv').config();
const {DATA_SOURCE}  = require('../config');

class ProductRepository {
  constructor(){
    this.product = DAOSFactory.getDAOS(DATA_SOURCE).productDao;
  }

  async save(object) {
    const newProductDTO = new ProductDTO(object);
    return await this.product.save(newProductDTO);
  }

  async getAll(){
    const productDTOS = await this.product.getAll();
    return productDTOS.map(dto => new ProductDTO(dto));
  }

  async getById(id){
    const findProductDTO = await this.product.getById(id);
    return new ProductDTO(findProductDTO);
  }

  async filterBy(field, value){
    const filteredProducts = await this.product.filterBy(field, value);
    return filteredProducts.map(dto => new ProductDTO(dto));
  }

  async update(id, newDataObject){
    const newProductDTO = new ProductDTO(newDataObject);
    return await this.product.update(id, newProductDTO);
  }

  async delete(id){
    return await this.product.delete(id);
  }
}

module.exports = {
    ProductRepository
}