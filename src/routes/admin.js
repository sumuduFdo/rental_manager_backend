const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

/** Admin Functionality
 * - Add new vehicle
 * - Delete vehicle
 * - Modify vehicle details
 * - Get Vehicle Details
 */

router.post('/add-vehicle', adminController.ad);

router.post('/edit-vehicle', adminController.modifyVehilce);

router.post('/delete-vehicle', adminController.deleteVehicle)

module.exports = router;