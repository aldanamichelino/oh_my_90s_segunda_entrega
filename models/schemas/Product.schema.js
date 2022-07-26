const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  code: {type: String, required: true, unique: true},
  image: {type: String, required: true},
  price: {type: Number, required: true, min: 0},
  stock: {type: Number, required: true, min: 0},
  sweet: {type: Boolean, required: true},
  timestamps: {type: Date, min: Date.now()}
});

module.exports = ProductSchema;