const express = require('express');
const router = express.Router()
const {getUser,
    registerUser,
    loginUser,
    yourAppointment,
    bookAppointment,
    cancelAppointmentby,
    resetPassword,
    preresetPassword,
    verifyOtp,
    createSession
} = require('../controllers/userController')

const {
    pendingAppointment,
    changeAppointmentStatus,
    cancelAppointment,
    creatGmeet,
} = require('../controllers/deanController');

const {protect,localVariables} = require('../middleware/authmiddleware')

//-------------Common Routs
router.post('/',registerUser);
router.post('/login',loginUser)
router.post('/createResetSession',createSession) 



//-------------User Routs
router.get('/alldeans',protect,getUser);
router.post('/alldeans',protect,bookAppointment);
router.post('/your-appointment',protect,yourAppointment);
router.post('/your-appointment',protect,cancelAppointmentby);
router.post('/pre-reset-pass',preresetPassword);
router.post('/reset-pass/:linkExpirationTime+link=hxh',resetPassword);
router.post('/verify-otp/:otp',localVariables,verifyOtp);


//-------------Dean Routs
//router.get('/fordean/',protect,pendingAppointment);
router.post('/fordean/',protect,pendingAppointment)
router.post('/fordean/cancelappointment',cancelAppointment);
router.put('/fordean/changestatus',changeAppointmentStatus);
//---google calender api routs
//router.get('/creat-gmeet',creatGmeet);


//----------gmeet controller
//router.get('/auth/google/callback',createMeetLink)

module.exports = router