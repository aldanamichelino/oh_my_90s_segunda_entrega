const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = Schema({
  products: [
    {
      product_id : {type: Schema.Types.ObjectId, ref: 'products'},
      quantity: {type: Number}
    }
  ],
  user_id: {type: Schema.Types.ObjectId, ref: 'users'},
  user_email: {type: String},
  user_address: {type: String},
  status: {type: String},
  timestamps: {type: Date, min: Date.now()}
});

module.exports = CartSchema;