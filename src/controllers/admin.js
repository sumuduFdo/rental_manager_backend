const Vehicle = require("../models/Vehicle");

exports.addVehicle = (req, res, next) => {
  const licencePlate = req.body.licencePlate;
  const make = req.body.make;
  const model = req.body.model;
  const year = req.body.year;
  const transmission = req.body.transmission;
  const engineCapacity = req.body.engineCapacity;
  const efficiency = req.body.efficiency;
  const vehicleType = req.body.vehicleType;

  // vehicle types: { car: 1, motorbike: 2 }
  const bodyType = vehicleType === 1 ? req.bodyType : undefined;
  const fuelType = vehicleType === 1 ? req.body.fuelType : undefined;
  const motorBikeType = vehicleType === 2 ? req.body.motorBikeType : undefined;

  const vehicleProperties = {
    licencePlate: licencePlate,
    make: make,
    model: model,
    year: year,
    transmission: transmission,
    engineCapacity: engineCapacity,
    efficiency: efficiency,
    vehicleType: vehicleType,
  }

  if(bodyType) {
    vehicleProperties.bodyType = bodyType;
  }

  if(fuelType) {
    vehicleProperties.fuelType = fuelType
  }

  if(motorBikeType) {
    vehicleProperties.motorBikeType = motorBikeType
  }

  const vehicle = new Vehicle(vehicleProperties);

  // add new vehicle to database
};

exports.deleteVehicle = (req, res, next) => {}

exports.modifyVehicle = (req, res, next) => {}

exports
