const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const vehicleSchema = new Schema({
  licencePlate: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  transmission: {type: String, required: true},
  engineCapacity: {type: String, required: true},
  efficiency: {type: String, required: true},
  vehicleType: { type: String, required: true },
  bodyType: { type: String },
  fuelType: { type: String },
  motorBikeType: { type: String },
  vehicleId: { type: ObjectId, required: true },
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
