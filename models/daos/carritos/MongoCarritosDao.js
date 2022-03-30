const ContenedorMongoDB = require("../../contenedores/ContenedorMongo");
const { Schema } = require('mongoose');

const carritosSchema = Schema({
    timestamp: {type: Date, min: Date.now()},
    products: [{type: Object, ref: 'products'}],
});


class MongoCarritosDao extends ContenedorMongoDB {
    constructor(){
        super('carts', carritosSchema);
    }

}

module.exports = MongoCarritosDao;