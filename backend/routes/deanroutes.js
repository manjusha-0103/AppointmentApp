const express = require('express');

const router = express.Router();

const {
    getAllappointments
} = require('../controllers/deanController')

router.get('/fordean',getAllappointments);