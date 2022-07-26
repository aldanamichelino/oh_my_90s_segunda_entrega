const MongoContainer = require("../../../containers/MongoContainer");
const UserSchema = require('../../../schemas/User.schema');
const { write } = require('../../../../winston/logger.config');
const { STATUS } = require('../../../../constants/api');

class UserDao extends MongoContainer {
    static instance;
    constructor(){
        if(!UserDao.instance){
          super('users', UserSchema);
          UserDao.instance = this;
          return this;
        } else {
          return UserDao.instance;
        }
    }
   
    async getByEmail(email) {
      try{
        const document = await this.model.findOne({email}, {__v: 0}).lean();
        if(!document){
          throw new Error(`${STATUS.INTERNAL_ERROR.tag}, code: ${STATUS.INTERNAL_ERROR.code}, Email o contraseña no válidos`);
        } else {
          return document;
        }
      } catch(error) {
        write('error', `Error: ${error.message}`);
        throw new Error(`${STATUS.INTERNAL_ERROR.tag}, code: ${STATUS.INTERNAL_ERROR.code}, ${error.message}`);
      }
    }
}

module.exports = UserDao;