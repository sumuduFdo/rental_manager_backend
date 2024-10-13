const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

/** Admin Functionality
 * - Add new vehicle
 * - Delete vehicle
 * - Modify vehicle details
 * - Get Vehicle Details
 */

router.post('/add-vehicle', adminController.addVehicle);

router.post('/edit-vehicle', adminController.modifyVehicle);

router.post('/delete-vehicle', adminController.deleteVehicle)

module.exports = router;