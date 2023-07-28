const express = require('express');
const router = express.Router()
const {getUser,
    registerUser,
    loginUser,
    yourAppointment,
    bookAppointment,
    cancelAppointmentby
} = require('../controllers/userController')

const {
    pendingAppointment,
    changeAppointmentStatus,
    cancelAppointment,
} = require('../controllers/deanController');

const {protect} = require('../middleware/authmiddleware')

//Common Routs
router.post('/',registerUser);
router.post('/login',loginUser)

//User Routs
router.get('/alldeans',protect,getUser);
router.post('/alldeans',protect,bookAppointment);
router.post('/your-appointment',protect,yourAppointment);
router.post('/your-appointment',protect,cancelAppointmentby);
//Dean Routs
//router.get('/fordean/',protect,pendingAppointment);
router.post('/fordean/',protect,pendingAppointment)
router.post('/fordean/cancelappointment',cancelAppointment);
router.put('/fordean/changestatus',changeAppointmentStatus);

module.exports = router