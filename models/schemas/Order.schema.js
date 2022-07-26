const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  number: {type: Number},
  products: [
    {
      product_name : {type: String},
      product_description: {type: String},
      quantity: {type: Number},
      price: {type: Number}
    }
  ],
  status: {type: String},
  email: {type: String},
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

module.exports = OrderSchema;
