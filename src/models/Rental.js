const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const RentalSchema = new Schema({
  rentalId: { type: ObjectId, required: true },
  vehicleId: { type: ObjectId, required: true, ref: 'Vehicle' },
  customerDetails: {
    customerName: { type: String, required: true },
    customerContact: { type: String, required: true },
    customerEmail: { Type: String },
  },
  rentalDate: { type: Date, required: true },
  dropOffDate: { type: Date, required: true },
  rentalCompleted: { type: Boolean, required: true },
  paymentDetails: {
    paymentMethod: { type: String, required: true },
    paymentAmount: { type: Number, required: true },
    paymentDate: {type: Number, required: true}
  },
});

module.exports = mongoose.model('Rental', RentalSchema);
