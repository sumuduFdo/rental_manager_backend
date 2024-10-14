const express = require('express');
const cors = require('cors');
const router = express.Router();

const rentalController = require('../controllers/rental');

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

router.get('/', rentalController.listAllVehicles);

router.get('/vehicles', rentalController.listAllVehicles);
router.get('/vehicles/:vehicleId', rentalController.getVehicleDetails);

router.get('/rentals', rentalController.listRentals)
router.get('/rentals/:rentalId', rentalController.getRentalDetails);

router.post('/update-status', rentalController.createRental);

module.exports = router;
