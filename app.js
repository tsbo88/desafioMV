const { response } = require("express");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

require("dotenv/config");

app.use(bodyParser.json());


//Import Routes
const patientRoute = require('./routes/patients');
const { parse } = require("path");
app.use('/patients', patientRoute);

//ROUTES
app.get('/', (request, response) => {
    response.status(403).send("Sem acesso");
});

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION, () => console.log("Connected to DB!")
);
app.listen(3000);