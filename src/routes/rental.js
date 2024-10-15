const express = require('express');
const cors = require('cors');
const router = express.Router();

const rentalController = require('../controllers/rental');

/** User Functionality
 * - Rent vehicle -> update vehicle status to not available
 * - List all rentals
 * - Find single rental -> by _id
 */

router.get('/add', rentalController.listRentals)
router.get('/detils', rentalController.getRentalDetails);

router.post('/update', rentalController.createRental);

module.exports = router;
