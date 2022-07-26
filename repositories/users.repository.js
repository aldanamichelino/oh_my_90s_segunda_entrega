const UserDTO = require('../models/dtos/User.dto');
const DAOSFactory = require('../models/daos/Daos.factory');
require('dotenv').config();
const {DATA_SOURCE}  = require('../config');

class UserRepository {
  constructor(){
    this.user = DAOSFactory.getDAOS(DATA_SOURCE).userDao;
  }

  async save(object) {
    const newUserDTO = new UserDTO(object);
    return await this.user.save(newUserDTO);
  }

  async getAll(){
    const UserDTOS = await this.user.getAll();
    return UserDTOS.map(dto => new UserDTO(dto));
  }

  async getById(id){
    const findUserDTO = await this.user.getById(id);
    return new UserDTO(findUserDTO);
  }

  async getByEmail(email){
    const findUserDTO = await this.user.getByEmail(email);
    return new UserDTO(findUserDTO);
  }

  async update(id, newDataObject){
    const newUserDTO = new UserDTO(newDataObject);
    return await this.user.update(id, newUserDTO);
  }

  async delete(id){
    return this.user.delete(id);
  }
}

module.exports = {
  UserRepository
}