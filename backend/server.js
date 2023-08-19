const express = require('express');
const colors=  require('colors')
require('dotenv').config();
const connectDB = require('./config/db')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require("express-session");

const port = process.env.PORT || 5000
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: "my-secret-key",
    resave: true,
    saveUninitialized: true,
}));

app.use(bodyParser.json());
connectDB();
//app.use('/api/dean',require('./routes/deanroutes'))
app.use('/api/users',require('./routes/userouts'))


app.listen(port, ()=>console.log(`servere started on port ${port}`))