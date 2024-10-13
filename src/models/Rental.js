const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const RentalSchema = new Schema({
    rentalId: { type: ObjectId, required: true },
    vehicleId: {type: ObjectId, required: true},
    customerName: {type: String, required: true},
});