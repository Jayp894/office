const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/users');
const express = require('express');
const auth = require('./routes/auth');
const app = express();
const config = require('config');
const upload = require('./routes/upload');
/*
if (!config.get('PrivateKey')) {
    console.error('FATAL ERROR: PrivateKey is not defined.');
    process.exit(1);
}
 */
mongoose.connect('mongodb://localhost/mongo-games')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(express.json());    
app.use("/api/users/", require("./routes/users"))
app.use('/api/auth', require("./routes/auth"));
app.use('/api/upload', require("./routes/upload"));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


