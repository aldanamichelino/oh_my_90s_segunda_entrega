const ContenedorMongoDB = require("../../contenedores/ContenedorMongo");
const { Schema } = require('mongoose');

const carritosSchema = Schema({
    timestamp: {type: Date, min: Date.now()},
    products: [{type: Schema.Types.ObjectId, ref: 'products'}],
});


class MongoCarritosDao extends ContenedorMongoDB {
    constructor(){
        super('carts', carritosSchema);
    }

    //acá van los métodos específicos del carro
}

module.exports = MongoCarritosDao;