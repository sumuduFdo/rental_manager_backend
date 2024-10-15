const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const mongoose = require('mongoose');
const db_conn_str = 'mongodb://localhost:27017/rental_manager';

const vehicleRoutes = require('./routes/vehicle');
const rentalRoutes = require('./routes/rental');
const errorController = require('./controllers/error')

const app = express();
const port = 5000;

// App configurations
app.use(cors());
app.use(express.json());


// Router configuration
app.use('/vehicles', vehicleRoutes);
app.use('/rentals', rentalRoutes)

app.use(errorController.requestNotFound);

/** establish mongodb connection */
mongoose
.connect(db_conn_str)
.then( () => {
    console.log("DB connection established successfully....");
    app.listen(port);
})
.catch((err) => {
    console.log("[Err]Failed to start application..\n", err);
});


