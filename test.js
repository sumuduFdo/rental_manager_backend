const express = require("express");

const mongoose = require("mongoose");
const Vehicle = require("./src/models/Vehicle");
const db_conn_str = "mongodb://localhost:27017/rental_manager";

const app = express();
const port = 5000;

/** establish mongodb connection */

function addVehicles() {
  vehicles = [
    {
      make: "BMW",
      model: "A4",
      year: 2008,
      transmission: "Semi-Automatic",
      fuelType: "Petrol",
      engineCapacity: 3.8,
      vehicleType: "Motorbike",
      availability: true,
      licencePlate: "IMG 2165",
      motorBikeType: "Dual-Sport",
    },
    {
      make: "Hyundai",
      model: "CX-5",
      year: 2012,
      transmission: "Manual",
      fuelType: "Electric",
      engineCapacity: 4.3,
      vehicleType: "Motorbike",
      availability: true,
      licencePlate: "WZZ 6743",
      motorBikeType: "Sportbike",
    },
    {
      make: "Chevrolet",
      model: "F-150",
      year: 2020,
      transmission: "Automatic",
      fuelType: "Hybrid",
      engineCapacity: 2.9,
      vehicleType: "Motorbike",
      availability: true,
      licencePlate: "HWS 2744",
      motorBikeType: "Touring",
    },
    {
      make: "Ford",
      model: "Civic",
      year: 2022,
      transmission: "Manual",
      fuelType: "Electric",
      engineCapacity: 2.6,
      vehicleType: "Motorbike",
      availability: false,
      licencePlate: "JWI 9017",
      motorBikeType: "Touring",
    },
    {
      make: "Kia",
      model: "A4",
      year: 2003,
      transmission: "Semi-Automatic",
      fuelType: "Electric",
      engineCapacity: 4.5,
      vehicleType: "Car",
      availability: true,
      licencePlate: "PWB 0322",
      bodyType: "Convertible",
    },
    {
      make: "Honda",
      model: "Elantra",
      year: 2002,
      transmission: "Automatic",
      fuelType: "Hybrid",
      engineCapacity: 2.8,
      vehicleType: "Car",
      availability: true,
      licencePlate: "ADL 8380",
      bodyType: "Hatchback",
    },
    {
      make: "Hyundai",
      model: "Malibu",
      year: 2002,
      transmission: "Semi-Automatic",
      fuelType: "Petrol",
      engineCapacity: 1.8,
      vehicleType: "Car",
      availability: false,
      licencePlate: "RNC 7069",
      bodyType: "Hatchback",
    },
    {
      make: "Nissan",
      model: "Malibu",
      year: 2014,
      transmission: "Automatic",
      fuelType: "Diesel",
      engineCapacity: 1.4,
      vehicleType: "Car",
      availability: false,
      licencePlate: "CHA 1285",
      bodyType: "SUV",
    },
    {
      make: "Nissan",
      model: "F-150",
      year: 2014,
      transmission: "Automatic",
      fuelType: "Electric",
      engineCapacity: 2.5,
      vehicleType: "Car",
      availability: true,
      licencePlate: "GRI 3120",
      bodyType: "Hatchback",
    },
    {
      make: "Kia",
      model: "Corolla",
      year: 2011,
      transmission: "Semi-Automatic",
      fuelType: "Petrol",
      engineCapacity: 4.1,
      vehicleType: "Car",
      availability: true,
      licencePlate: "GIR 4915",
      bodyType: "Convertible",
    },
    {
      make: "Chevrolet",
      model: "A4",
      year: 2008,
      transmission: "Semi-Automatic",
      fuelType: "Petrol",
      engineCapacity: 1.1,
      vehicleType: "Motorbike",
      availability: false,
      licencePlate: "XNX 7239",
      motorBikeType: "Touring",
    },
    {
      make: "Ford",
      model: "A4",
      year: 2001,
      transmission: "Semi-Automatic",
      fuelType: "Electric",
      engineCapacity: 4.1,
      vehicleType: "Car",
      availability: true,
      licencePlate: "RBX 4057",
      bodyType: "Hatchback",
    },
    {
      make: "Ford",
      model: "CX-5",
      year: 2013,
      transmission: "Automatic",
      fuelType: "Hybrid",
      engineCapacity: 1.2,
      vehicleType: "Motorbike",
      availability: false,
      licencePlate: "HZM 8478",
      motorBikeType: "Touring",
    },
    {
      make: "Honda",
      model: "F-150",
      year: 2020,
      transmission: "Automatic",
      fuelType: "Electric",
      engineCapacity: 4.8,
      vehicleType: "Motorbike",
      availability: true,
      licencePlate: "JFV 7634",
      motorBikeType: "Dual-Sport",
    },
    {
      make: "Toyota",
      model: "CX-5",
      year: 2004,
      transmission: "Manual",
      fuelType: "Hybrid",
      engineCapacity: 3.5,
      vehicleType: "Car",
      availability: true,
      licencePlate: "ASR 8863",
      bodyType: "Convertible",
    },
    {
      make: "BMW",
      model: "Corolla",
      year: 2013,
      transmission: "Manual",
      fuelType: "Petrol",
      engineCapacity: 3.9,
      vehicleType: "Motorbike",
      availability: true,
      licencePlate: "RIQ 9312",
      motorBikeType: "Touring",
    },
    {
      make: "Honda",
      model: "CX-5",
      year: 2003,
      transmission: "Semi-Automatic",
      fuelType: "Diesel",
      engineCapacity: 1.9,
      vehicleType: "Motorbike",
      availability: false,
      licencePlate: "HDQ 4410",
      motorBikeType: "Dual-Sport",
    },
    {
      make: "BMW",
      model: "Altima",
      year: 2002,
      transmission: "Semi-Automatic",
      fuelType: "Petrol",
      engineCapacity: 2.3,
      vehicleType: "Motorbike",
      availability: false,
      licencePlate: "EUA 0601",
      motorBikeType: "Cruiser",
    },
    {
      make: "Toyota",
      model: "3 Series",
      year: 2019,
      transmission: "Manual",
      fuelType: "Diesel",
      engineCapacity: 1.5,
      vehicleType: "Car",
      availability: false,
      licencePlate: "GLZ 6335",
      bodyType: "Sedan",
    },
    {
      make: "Chevrolet",
      model: "Civic",
      year: 2003,
      transmission: "Automatic",
      fuelType: "Hybrid",
      engineCapacity: 2.1,
      vehicleType: "Motorbike",
      availability: false,
      licencePlate: "EIU 2274",
      motorBikeType: "Touring",
    },
  ];

  vehicles.forEach((vehicle) => {
    const vehicleProperties = {
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      transmission: vehicle.transmission,
      fuelType: vehicle.fuelType,
      engineCapacity: vehicle.engineCapacity,
      vehicleType: vehicle.vehicleType,
      availability: vehicle.availability,
      licencePlate: vehicle.licencePlate,
    };
    if(vehicle.bodyType) {
      vehicleProperties.bodyType = vehicle.bodyType;
    }
    if(vehicle.motorBikeType) {
      vehicleProperties.motorBikeType = vehicle.motorBikeType;
    }

    const newV = new Vehicle(vehicleProperties);
    newV
      .save()

      .then((res) => {
        console.log(res);
        console.log('new vehicle added successfully');
        console.log('....................................')
      })
      .catch((err) => console.log(err));
  });
}
mongoose
  .connect(db_conn_str)
  .then(() => {
    console.log("DB connection established successfully....");
    addVehicles();
  })
  .catch((err) => {
    console.log("[Err]Failed to start application..\n", err);
  }).finally(() => {
  });

