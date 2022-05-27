const MongoContainer = require("../../containers/MongoContainer");
const { Schema } = require('mongoose');
const { write } = require('../../../config');


const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      "Invalid email",
    ],
  },
  password: { type: String, required: true },
  name: {type: String, required: true},
  address: {type: String, required: true},
  age: {type: Number, required: true},
  phone: {type: String, required: true},
  avatar: {type: Object, required: true},
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});
UserSchema.index({ email: 1 });

module.exports = UserSchema;


class UsersDao extends MongoContainer {
    constructor(){
        super('users', UserSchema);
    }


    async createUser(userItem){
        try{
            const user = await this.save(userItem);
            if(user){
                await user.save();
                return user;
            }
        }catch(error){
            write('error', `Error: ${error.message}`);
        }
    }

    
    async getById(id) {
        try{
            const document = await this.model.findById(id, {__v: 0}).lean();
            if(!document){
                const errorMessage = `El usuario con el id ${id} no existe en nuestros registros`;
                write('error', `Error: ${errorMessage}`);
                throw new Error(JSON.stringify(errorMessage));
            } else {
                return document;
            }

        }catch(error){
            throw new Error(JSON.stringify(error.message));
        }
    }


    async getByEmail(email) {
        try{
            const document = await this.model.findOne({email}, {__v: 0}).lean();
            if(!document){
                const errorMessage = `Nombre de usuario o contraseña inválidos`;
                write('error', `Error: ${errorMessage}`);
                throw new Error(JSON.stringify(errorMessage));
            } else {
                return document;
              }
        }   catch(error) {
            throw new Error(JSON.stringify(error.message));
        }
    }
}

module.exports = UsersDao;