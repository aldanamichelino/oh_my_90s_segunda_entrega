const { UserRepository } = require('../../repositories/users.repository');
const { write } = require('../../winston/logger.config');
const { STATUS } = require('../../constants/api');
const { viewErrorHandler } = require('../../utils/viewErrors');

class UserService {
  constructor() {
      this.userDAO = new UserRepository;
  }

  async createUser(userItem){
    return await this.userDAO.save(userItem);
  }

  async getAllUsers(){
    return await this.userDAO.getAll();
  }
    
  async getUserById(id) {
    try{
      const user = await this.userDAO.getById(id);
      if(!user){
        throw new Error(`${STATUS.BAD_REQUEST.tag}, code: ${STATUS.BAD_REQUEST.code}, El usuario con el id ${id} no existe en nuestros registros`);
      } else {
          return user;
      }
    }catch(error){
      write('error', error.message);
      throw new Error(`${STATUS.INTERNAL_ERROR.tag}, code: ${STATUS.INTERNAL_ERROR.code}, ${error.message}`);
    }
  }
  
  async getUserByEmail(email) {
    return await this.userDAO.getByEmail(email);
  }

  async updateUser(id, newDataObject){
    return await this.userDAO.update(id, newDataObject);
  }

  async deleteUser(id){
    return await this.userDAO.delete(id);
  }
}

module.exports = {
  UserService
}