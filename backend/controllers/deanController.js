const Dean = require('../models/dean')
const User = require('../models/userModels')
const Booking = require('../models/appointment')
const asyncHandler = require('express-async-handler')
const moment = require('moment');
/*const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./localStorage');*/



const pendingAppointment= asyncHandler(async(req,res)=>{
    try{
        //console.log(req.body.data.uniid)
        const cursor= await (Booking.find({dean :req.body.data.uniid,appointmentstatus:"pending"}))
        //console.log(cursor)
        if(cursor){
            res.status(200).send({
                data : cursor,
                success : true,
                message: "Appointmnet list fetched successfully"
            })
        }
        else{
            res.status(201).send({
                success:false,
                message: "No pending appointmnet"
            })
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "error while fetching data"
        })
    }
})

const changeAppointmentStatus = asyncHandler(async(req,res)=>{
    try{
        const id = req.body._id
        const cursor = await(Booking.findById({_id : id}).updateOne({appointmentstatus:"Done"}))
        if(cursor.appointmentstatus == "Done"){
            res.status(200).send(
                data = cursor,
            )            
        }
    }
    catch(error){
        res.status(500)
        console.log(error);
    }
})

const cancelAppointment = asyncHandler(async(req,res)=>{
    try{
        const id = req.body._id;
        //console.log(id)
        const cursor = await( Booking.findByIdAndRemove({_id : id}));
        console.log(cursor)
        if(cursor){
            res.status(200).send({
                success : true,
                message: "Appoinment is canceled successfully..."
            
                }
            )
        }
        else{
            res.status(400).send({
                success : true,
                message: "Problem in canceling the appoinment"
            
                }
            )
        }
    }
    catch(error){
        res.status(500)
        console.log(error);
    }
})


module.exports={
    pendingAppointment,
    changeAppointmentStatus,
    cancelAppointment,
}