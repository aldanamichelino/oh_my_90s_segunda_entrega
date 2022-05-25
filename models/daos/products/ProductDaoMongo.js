const MongoContainer = require("../../containers/MongoContainer");
const { Schema } = require("mongoose");

const productSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    code: {type: String, required: true, unique: true},
    image: {type: String, required: true},
    price: {type: Number, required: true, min: 0},
    stock: {type: Number, required: true, min: 0},
    sweet: {type: Boolean, required: true},
    timestamps: {type: Date, min: Date.now()}
});


class ProductDaoMongo extends MongoContainer {
    constructor(){
        super('products', productSchema);
    }

    async filterBy(field, value){
        const object = {};
        object[field] = value;
        try{
            const documents = await this.model.find(object, {__v: 0}).lean();
            return documents;
        } catch(error){
            console.log(error.message);
        }
    }
}

module.exports = ProductDaoMongo;