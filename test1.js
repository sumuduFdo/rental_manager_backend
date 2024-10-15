const mongoose = require('mongoose');
const Rental = require('./src/models/Rental'); // Assuming the model file is named 'rental.js'

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/rental_manager');

// Generate a list of random rentals
const generateRandomRentals = () => {
  const rentals = [];
  
  for (let i = 0; i < 20; i++) {
    const rentalId = new mongoose.Types.ObjectId();  // Generate a unique rental ID
    const vehicleId = new mongoose.Types.ObjectId(); // You would typically fetch or generate this from a Vehicle collection
    
    const rental = {
      rentalId: rentalId,
      vehicleId: vehicleId, // You can add the Vehicle ObjectId here or randomly generate it
      customer: {
        name: `Customer ${i + 1}`,
        email: `customer${i + 1}@example.com`,
        phone: `555-1234-${i + 1}`
      },
      rentalDate: new Date(new Date().setDate(new Date().getDate() - (i + 1))),  // Rental date is 1 day earlier for each rental
      dropOffDate: new Date(new Date().setDate(new Date().getDate() + 1 + (i + 1))),  // Drop-off date 1 or 2 days later
      totalPrice: Math.floor(Math.random() * (500 - 100 + 1)) + 100  // Random price between $100 and $500
    };
    
    rentals.push(rental);
  }

  return rentals;
};

// Insert the rentals into the database
const insertRentals = async () => {
  const rentals = generateRandomRentals();
  
  try {
    await Rental.insertMany(rentals);
    console.log('Inserted 20 rentals into the database.');
  } catch (error) {
    console.error('Error inserting rentals:', error);
  } finally {
    mongoose.connection.close();  // Close the database connection
  }
};

// Execute the insertion
insertRentals();
