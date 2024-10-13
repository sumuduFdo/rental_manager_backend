const express = require('express');
const router = express.Router();

const vehicleController = require('../controllers/vehicle');

/** User Functionality
 * - List All Vehicles
 * - Get Vehicle Details
 * - Update Vehicle Status
 * Additional
 * - List all rentals
 * - Filter Rentals By
 *      - ongoing
 *      - completed
 */

router.get('/', vehicleController.getIndex);

router.get('/vehicles', vehicleController.listAllVehicles);
router.get('/vehicles/:vehicleId', vehicleController.getVehicleDetails);

router.get('/rentals', vehicleController.listRentals)
router.get('/rentals/:rentalId', vehicleController.getRentalDetails);

router.post('/update-status', vehicleController.updateVehicleStatus);
