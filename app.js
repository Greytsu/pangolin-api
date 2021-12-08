const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const cors = require('cors')

//Middlewares----------------------------------------------------------
require('dotenv/config')
app.use(cors());
app.use(bodyParser.json());

//Routes----------------------------------------------------------------
const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

const loginRoute = require('./routes/login');
app.use('/login', loginRoute);

app.get('/', (req, res) => {
    res.send ('We are on home');
});

//DB connection---------------------------------------------------------
mongoose.connect(process.env.DB_URL, () => {console.log("connected to apartoo");})

//Start
app.listen(2508);