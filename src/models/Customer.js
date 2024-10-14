const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

const CustomerSchema = new Schema({
  customerId: { type: ObjectId, requried: true },
  name: { type: String, requried: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
});

module.exports = mongoose.model('Customer', CustomerSchema);
