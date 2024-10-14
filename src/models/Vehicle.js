const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

const vehicleSchema = new Schema({
  licencePlate: { type: String, required: true, unique: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  transmission: { type: String, required: true },
  fuelType: { type: String },
  engineCapacity: { type: String, required: true },
  vehicleType: { type: String, required: true },
  availability: { type: Boolean, required: true },
  bodyType: { type: String },
  motorBikeType: { type: String },
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
