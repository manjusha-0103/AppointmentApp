const Dean = require('../models/dean')
const User = require('../models/userModels')
const Booking = require('../models/appointment')
const asyncHandler = require('express-async-handler')
const moment = require('moment');
const sendEmail = require("../utils/sendEmail.js");

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
            const date = moment(cursor.appointmentDate).utc().format("DD-MM-YYYY")
            const msg = `
                <div>
                    <h1 style="color: orange; text-align:center">Appointment with ${cursor.dean}! is canceled. </h1>
                </div>
                
                <div style="text-align: center; font-size: 18px">
                    <p>Your appointment with  ${cursor.dean}! on ${date} at 10AM is canceled</p>
                    
                </div>
            `;
            const subject =  `AppointmenApp|| Registration successfull`;
            sendEmail(cursor.user_mail,subject,"HELLO!!",msg)
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

const creatGmeet = asyncHandler(async(req,res)=>{})


module.exports={
    pendingAppointment,
    changeAppointmentStatus,
    cancelAppointment,
    creatGmeet
}