const Vehicle = require("../models/Vehicle");

// vehicle types: { car: 1, motorbike: 2 }

exports.fetchAllVehicles = (req, res, next) => {
  Vehicle.find()
    .then((vehicles) => {
      res.json({ success: true, error: null, data: vehicles });
    })
    .catch((err) => {
      console.log(`[Err] INFO: ${err}`);
      res.status(500).json({
        success: false,
        error: { status: err.status, message: err.message },
      });
    });
};

exports.fetchVehicle = (req, res, next) => {
  const licencePlate = req.params.licencePlate;
  console.log("licnce: ", licencePlate);
  console.log("fetching vehicle");
  Vehicle.find({ licencePlate: licencePlate })
    .then((data) => {
      console.log(data);
      if (data.length === 0) {
        res.json({
          success: false,
          error: { status: 404, message: "Vehicle not found" },
          data: null,
        });
      } else {
        res.json({ success: true, error: null, data: data[0] });
      }
    })
    .catch((err) => {
      console.log(`[Err] INFO: ${err}`);
      res.status(500).json({
        success: false,
        error: { status: err.status, message: err.message },
      });
    });
};

exports.addVehicle = (req, res, next) => {
  const vehicleData = {
    licencePlate: req.body.licencePlate,
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    transmission: req.body.transmission,
    fuelType: req.body.fuelType,
    engineCapacity: req.body.engineCapacity,
    vehicleType: req.body.vehicleType,
    availability: req.body.availability,
  };
  if (req.body.bodyType !== "") {
    vehicleData.bodyType = req.body.bodyType;
  }
  if (req.body.motorBikeType !== "") {
    vehicleData.motorBikeType = req.body.motorBikeType;
  }
  const vehicle = new Vehicle(vehicleData);
  vehicle
    .save()
    .then(() => {
      console.log("New vehicle added");
      res.status(201).json({ success: true, error: null, data: null });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        succss: true,
        error: { status: err.status, message: err.message },
        data: null,
      });
    });
};

exports.deleteVehicle = (req, res, next) => {
  const vehicleId = req.body.vehicleId;
  Vehicle.findOne({ _id: vehicleId })
    .then((vehicle) => {
      if (vehicle.availability === true) {
        return vehicle.deleteOne();
      } else {
        throw new Error("Vehicle not available");
      }
    })
    .then(() => {
      console.log(`Deleted vehicle with ID: ${vehicleId}`);
      res.status(201).json({ success: true, error: null });
    })
    .catch(() => {
      const err = vehicleProperties.err;
      console.log(`[Err] INFO: ${errInfo}`);
      res.status(500).json({
        success: false,
        error: { status: err.status, message: err.message },
      });
    });
};

exports.deleteByLicence = (req, res, next) => {
  const licence = req.body.licencePlate;
  Vehicle.findOneAndDelete({ licencePlate: licence })
    .then((result) => {
      console.log("Delete success");
      res.status(201).json({ success: true, error: null });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        succss: true,
        error: { status: err.status, message: err.message },
        data: null,
      });
    });
};

exports.updateVehicle = (req, res, next) => {
  const licencePlate = req.body.licencePlate;

  const data = req.body;
  Vehicle.findOne({ licencePlate: licencePlate})
    .then((vehicle) => {
      // update properties of the vehicle
      vehicle.licencePlate = data.licencePlate;
      vehicle.make = data.make;
      vehicle.model = data.model;
      vehicle.year = data.year;
      vehicle.transmission = data.transmission;
      vehicle.fuelType = data.fuelType;
      vehicle.engineCapacity = data.engineCapacity;
      vehicle.vehicleType = data.vehicleType;
      vehicle.availability = data.availability;

      if (data.bodyType) {
        vehicle.bodyType = data.bodyType;
      }
      if (data.motorBikeType) {
        vehicle.motorBikeType = data.motorBikeType;
      }
      return vehicle.save();
    })
    .then(() => {
      console.log(`Updated vehicle with Id: ${data._id}`);
      res.status(201).json({ success: true, error: null });
    })
    .catch((err) => {
      console.log(`[Err] INFO: ${err}`);
      res.status(500).json({
        success: false,
        error: { status: err.status, message: err.message },
      });
    });
};
