const ContenedorMongoDB = require("../../contenedores/ContenedorMongo");
const { Schema } = require("mongoose");

const productsSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    code: {type: String, required: true, unique: true},
    image: {type: String, required: true},
    price: {type: Number, required: true, min: 0},
    stock: {type: Number, required: true, min: 0},
    timestamps: {type: Date, min: Date.now()}
});


class MongoProductosDao extends ContenedorMongoDB {
    constructor(){
        super('products', productsSchema);
    }
}

module.exports = MongoProductosDao;