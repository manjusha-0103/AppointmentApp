const express = require('express');
const colors=  require('colors')
const dotenv = require('dotenv').config() 
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const app = express();
app.use(express.json());
connectDB();
//app.use('/api/dean',require('./routes/deanroutes'))
app.use('/api/users',require('./routes/userouts'))


app.listen(port, ()=>console.log(`servere started on port ${port}`))