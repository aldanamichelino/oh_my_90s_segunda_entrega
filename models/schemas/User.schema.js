const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
  isAdmin: {type: Boolean, required: true},
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

UserSchema.index({ email: 1 });

module.exports = UserSchema;
