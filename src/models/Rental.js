const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

const RentalSchema = new Schema({
  rentalId: { type: ObjectId, required: true },
  vehicleId: { type: ObjectId, required: true, ref: 'Vehicle' },
  customer: {
    name: { type: String, required: true },
    email: {type: String, required: true},
    phone: {type: String, required: true},
  },
  rentalDate: { type: Date, required: true },
  dropOffDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
});

module.exports = mongoose.model('Rental', RentalSchema);
