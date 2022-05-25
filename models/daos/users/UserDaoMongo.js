const MongoContainer = require("../../containers/MongoContainer");
const { Schema } = require('mongoose');


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
  phone: {type: String, required: true, match:[
      /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/gm,
      "Invalid phone"
    ]},
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
            console.log(error.message);
        }
    }

    
    async getById(id) {
        try{
            const document = await this.model.findById(id, {__v: 0}).lean();
            if(!document){
                const errorMessage = `El usuario con el id ${id} no existe en nuestros registros`;
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