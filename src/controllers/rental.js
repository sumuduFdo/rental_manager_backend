const Vehicle = require("../models/Vehicle");
const Rental = require("../models/Rental");

exports.listRentals = (req, res, next) => {
  Rental.find()
    .then((rentals) => {
      res.json({ success: true, error: null, data: rentals });
    })
    .catch((err) => {
      console.log(`[Err] INFO: ${err}`);
      res.status(500).json({ success: false, error: {status: err.status, message: err.message}});
    });
};

exports.getRentalDetails = (req, res, next) => {
  const rentalId = route.params.rentalId;
  Rental.findById(rentalId)
    .then((rental) => {
      res.json({ success: true, error: null, data: rental });
    })
    .catch((err) => {
      console.log(`[Err] INFO: ${err}`);
      res.status(500).json({ success: false, error: {status: err.status, message: err.message} });
    });
};

exports.createRental = (req, res, next) => {
  const vehicleId = req.body.vehicleId;
  let currentVehicle;
  const rentalData = {};

  Vehicle.findById(vehicleId)
    .then((vechicle) => {
      currentVehicle = vehicle;
      if (vechicle.available === true) {
        // get customer details
        const name = req.body.customerName;
        const phone = req.body.phone;
        const email = req.body.email;

        // get rental details
        const rentalDate = req.body.rentalDate;
        const dropOffDate = req.body.dropOffDate;
        const totalPrice = req.body.totalPrice;

        const rental = new Rental({
          vehicleId: vehicleId,
          customer: { name: name, email: email, phone: phone },
          rentalDate: rentalDate,
          dropOffDate: dropOffDate,
          totalPrice: totalPrice,
        });

        // update rentalData property
        rentalData.rentalDate = rentalDate;
        rentalData.dropOffDate = dropOffDate;
        rentalData.totalPrice = totalPrice;

        return rental.save();
      } else {
        throw new Error('Vehicle Not Available')
      }
    })
    .then(() => {
      vehicle.available = false;
      return vehicle.save();
    })
    .then(() => {
      console.log(`Rental created for vehicle with Id: ${vehicleId}`);
      res.status(201).json({ success: true, error: null, data: rentalData});
    })
    .catch((err) => {
      console.log(`[Err] INFO: ${err}`);
      res.status(500).json({ success: false, error: {status: err.status, message: err.message} });
    });
};