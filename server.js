'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const seed = require('./routes/seed');

connectDB();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/books', seed);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
