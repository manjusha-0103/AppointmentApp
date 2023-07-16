const express = require('express');
const router = express.Router()
const {getUser,
    registerUser,
    loginUser,
    //loginDean,
    bookAppointment
} = require('../controllers/userController')

const {protect} = require('../middleware/authmiddleware')
router.post('/',registerUser);
router.post('/login',loginUser)//,loginDean);
//router.get('/alldeans',getUser);

const {
    getAllappointments
} = require('../controllers/deanController');

router.get('/fordean',getAllappointments);

router.get('/alldeans',protect,getUser);
router.post('/bookAppointment',bookAppointment);
//router.get('/me',protect);

/**router.post('/set',(req,res)=>{
    res.status(200).json({message :'set golas'})
})
  
router.put('/:id',(req,res)=>{
    res.status(200).json({message :`update golas at ${req.params._id}`})
}) 

router.delete('/:id',(req,res)=>{
    res.status(200).json({message :`delete golas at ${req.params._id}`})
})
**/


module.exports = router