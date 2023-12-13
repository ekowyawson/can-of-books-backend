'use strict';

require('dotenv').config();
const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send("Welcome To Can Of Books.");
})

// Routes
app.use('/', require('./routes/seed'));

// Listener
app.listen(PORT, () => console.log(`listening on ${PORT}`));
