const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const db_conn_str = 'mongodb://localhost:27017/'

const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({ extended: false }));

/** establish mongodb connection */
mongoose
.connect(db_conn_str)
.then( () => {
    console.log("DB connection established successfully....")
})
.catch((err) => {
    console.log("[Err]Failed to start application..\n", err);
});