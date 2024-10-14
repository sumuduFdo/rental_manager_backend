const Vehicle = require("../models/Vehicle");

// vehicle types: { car: 1, motorbike: 2 }
const getVehicleDetails = function (reqData) {
  const objData = { error: { status: true, info: null }, data: null };
  try {
    const licencePlate = reqData.licencePlate;
    const make = reqData.make;
    const model = reqData.model;
    const year = reqData.year;
    const transmission = reqData.transmission;
    const fuelType = reqData.fuelType;
    const engineCapacity = reqData.engineCapacity;
    const vehicleType = reqData.vehicleType;
    const availability = reqData.availability;
    const bodyType = type === 1 ? reqData.bodyType : undefined;
    const motorBikeType =
      vehitypecleType === 2 ? reqData.motorBikeType : undefined;

    const vehicleProperties = {
      licencePlate: licencePlate,
      make: make,
      model: model,
      year: year,
      transmission: transmission,
      fuelType: fuelType,
      engineCapacity: engineCapacity,
      vehicleType: vehicleType,
      availability: availability,
    };

    if (bodyType) {
      vehicleProperties.bodyType = bodyType;
    }

    if (motorBikeType) {
      vehicleProperties.motorBikeType = motorBikeType;
    }
    objData.data = vehicleProperties;
  } catch (err) {
    objData.error.status = true;
    objData.error.info = err;
  }
  return objData;
};

exports.addVehicle = (req, res, next) => {
  const vehicleProperties = getVehicleDetails(req.body);
  if (vehicleProperties.error === false) {
    const vehicle = new Vehicle(vehicleProperties.data);
    vehicle
      .save()
      .then(() => {
        console.log("New vehicle added");
        res.status(201).json({ success: true, error: null });
      })
      .catch((err) => {
        console.log(`[Err] INFO: ${err}`);
        res.status(500).json({
          success: false,
          error: { status: err.status, message: err.message },
        });
      });
  } else {
    const errStatus = vehicleProperties.error.status;
    const errInfo = vehicleProperties.error.info;
    console.log(`[Err] INFO: ${errInfo}`);
    res
      .status(500)
      .json({ success: false, error: { status: errStatus, message: errInfo } });
  }
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
      const errInfo = vehicleProperties.errInfo;
      console.log(`[Err] INFO: ${errInfo}`);
      res.status(500).json({
        success: false,
        error: { status: err.status, message: err.message },
      });
    });
};

const fs = require("fs");

exports.updateVehicle = (req, res, next) => {
  console.log("request: ", req);
  const keys = Object.keys(req);
  console.log(keys);
  const vehicleId = req.body.vehicleId;
  console.log(req.body);
  const vehicleProperties = getVehicleDetails(req.body);
  if (vehicleProperties.error === false) {
    const data = vehicleProperties.data;

    Vehicle.findById(id)
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
        console.log(`Updated vehicle with Id: ${vehicleId}`);
        res.status(201).json({ success: true, error: null });
      })
      .catch((err) => {
        console.log(`[Err] INFO: ${err}`);
        res.status(500).json({
          success: false,
          error: { status: err.status, message: err.message },
        });
      });
  } else {
    const errStatus = vehicleProperties.error.status;
    const errInfo = vehicleProperties.error.info;
    console.log(`[Err] INFO: ${errInfo}`);
    res
      .status(500)
      .json({ success: false, error: { status: errStatus, message: errInfo } });
  }
};
