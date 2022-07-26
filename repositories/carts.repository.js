const CartDTO = require('../models/dtos/Cart.dto');
const DAOSFactory = require('../models/daos/Daos.factory');
require('dotenv').config();
const {DATA_SOURCE}  = require('../config');

class CartRepository {
  constructor(){
    this.cart = DAOSFactory.getDAOS(DATA_SOURCE).cartDao;
  }

  async createCart(user, product_id, quantity) {
    return this.cart.createNewCart(user, product_id, quantity);
  }

  async getAll(){
    const CartDTOS = await this.cart.getAll();
    return CartDTOS.map(dto => new CartDTO(dto));
  }

  async getById(id){
    const findCartDTO = await this.cart.getById(id);
    return new CartDTO(findCartDTO);
  }

  async getCartByUserId(user_id, status){
    const cart = await this.cart.getCartByUserId(user_id, status);
    return cart ? new CartDTO(cart) : cart;
  }

  async update(cartId, newCartState){
    return await this.cart.update(cartId, newCartState);
  }

  async deleteProductFromCart(user_id, product_id){
    return this.cart.deleteProductFromCart(user_id, product_id);
  }

  async delete(id){
    return this.cart.delete(id);
  }
}

module.exports = {
  CartRepository
}