const express = require('express');
const router = express.Router();

const vehicleController = require('../controllers/vehicle');

/** Admin Functionality
 * - fetchAllVehicles
 * - fetchVehicle -> by licence plate
 * - Add new vehicle
 * - Delete vehicle -> by licence (unique)
 * - Modify vehicle details
 * - Get Vehicle Details
 */

router.post('/add', vehicleController.addVehicle);

router.get('/fetchVehicle/:licencePlate', vehicleController.fetchVehicle);
router.post('/modify', vehicleController.updateVehicle);
router.post('/delete', vehicleController.deleteByLicence);

module.exports = router;