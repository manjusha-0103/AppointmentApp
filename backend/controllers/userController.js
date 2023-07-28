const User = require('../models/userModels')
const Dean = require('../models/dean')
const Booking = require('../models/appointment')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs');
JWT_SECRET = "hdbnmhuyr879376xhhskbbm6840820"
const moment = require('moment');




const getUser = asyncHandler(async(req,res)=>{
    try{
        const cursor= await Dean.find({})
        //console.log(cursor)
        if(cursor){
            res.status(200).send({
                data : cursor,
             success : true,
             message : "Deans list fetched successfully"
            })
        }
        else{
            res.status(201).send({
                success : false,
                message : "Dean's data not found"
            })
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success : false,
            error,
            message : "error while fetching data"
        })
    }
})

const registerUser = asyncHandler(async(req,res) =>{
    //console.log(req.body);
    const {uniid, isStudent,isDean,password} = req.body
    

    if(!uniid || !password){
        res.status(201)
        throw new Error ('Please add all the fields')
    }
    
    const salt = await bcrypt.genSalt(10)
    //console.log(salt)
    const hashedPassword = await bcrypt.hash(password,salt)
    if(isDean){
        const userExists = await Dean.findOne({uniid})
        if (userExists){
            res.status(200).send({
                success : false,
                message : 'Dean already Exists'
            })
            throw new Error ('Dean already Exists')
        }
        else{
            const dean =  await Dean.create({
                uniid ,
                //timings,
                password : hashedPassword
                
            })
            if(dean){
                res.status(201).send({
                    success : true,
                    message : "Dean registered succcessfully",
                        _id : dean._id ,
                      uniid : dean.uniid,
                      token : generateToken(dean._id)
                })
            }
            
            else{
                res.status(400);
                throw new Error('Invalid Dean data');
            }
        }
    }
    else {
        const userExists = await User.findOne({uniid})
        if (userExists){
            res.status(200).send({
                success : false,
                message : "Student already Exists"
            })
            throw new Error ('User already Exists')
        }
        else{
            const user =  await User.create({
                uniid ,
                isStudent,
                password : hashedPassword
                
            })
        
            if(user){
                res.status(201).send({
                    success : true,
                    message : "Student registered succcessfully",
                        _id : user._id ,
                  isStudent : user.isStudent,
                      uniid : user.uniid,
                      token : generateToken(user._id)
                })
            }
            
            else{
                res.status(400);
                throw new Error('Invalid user data');
            }
        }
    } 
     
        
})
const generateToken = (id) =>{
    return jwt.sign({id},JWT_SECRET,{
        expiresIn : '30d',
    })
}

const loginUser= asyncHandler(async(req,res)=>{
    const {uniid,password} = req.body

    const user = await (User.findOne({uniid}))
    if(user && (await bcrypt.compare(password,user.password)) && user.isStudent){
        res.status(201).send({
             success : true,
             message : "Student logged in succcessfully",
                 _id : user._id,
           isStudent : user.isStudent,
               uniid : user.uniid,
               token : generateToken(user._id)
        
        })
    }
    
    else{
        const dean = await (Dean.findOne({uniid}))
        if(dean && (await bcrypt.compare(password,dean.password))){
            res.status(201).send({
                success : true,
                message : "Dean logged in succcessfully",
                    _id : dean._id,
              isStudent : false,
                  uniid : dean.uniid,
                  token : generateToken(dean._id)
            
            })
        }
        else{
            res.status(201).send({
                success : false,
                message : "Invalid credential",
            })
            throw new Error('Invalid credential');
        }
        
    }
})
/*const loginDean= asyncHandler(async(req,res)=>{
    const {uniid,password} = req.body

    const user = await (Dean.findOne({uniid}))
    if(user && (await bcrypt.compare(password,user.password))){
        res.send({
            success: true,
            message : "Dean logged in succcessfully",
            _id : user._id,
            //usertype: user.usertype,
            uniid: user.uniid,
            token : generateToken(user._id)
        })
    }
    else{
        res.status(200).send({
            success: false,
            message : "Invalid credential",
        })
        throw new Error('Invalid credential');
    }
})*/
const bookAppointment= asyncHandler(async(req,res)=>{
    
    
    try{
        console.log(req.body)
        req.body.appointmentDate = moment(req.body.appointmentDate, "YYYY-MM-DD").toISOString();
        req.body.appointmentstatus =  "pending";
        const c = await (Booking.find({}).count()) ;
        if (c === 0){
            const newappointment = new Booking(req.body);
            await newappointment.save();
        }
        else{
        
            const available = await (availableAppoinment(req.body.appointmentDate,req.body.dean));
            console.log(available);
            if (available){
                const newappointment = new Booking(req.body)
                await newappointment.save()
                res.status(201).send({
                    success :true,
                    message : "appointment book succesfully"
                });
            }
            else{
                res.status(201).send({
                    success :false,
                    message:"Appoinrment is not available"
                }); 
            }
        }    
    }
        
        
    catch(error){
        console.log(error);
        res.status(500);
        throw new Error("Error while booking the appoinment")
        
    }
})
const availableAppoinment =async(date,dean) =>{
    
        const appoinments = await((Booking.findOne({
                       dean : dean,
            appointmentDate : date,
            
        }).count()))
        console.log(appoinments)
        if (appoinments >0){
            return false
                //res.status(200).json({
                //message:"Appoinrment is not available"
            //});
        }
        else{
            return true
                //res.status(200).jason({
                //message:"Appointment is avaialble"
            //})
        }

    
}
const yourAppointment =asyncHandler(async (req,res) =>{
    try{
        //const {} = req.body
        //console.log(req.body.data.uniid);
        
        const cursor= await (Booking.find({user: req.body.data.uniid}))
        console.log(cursor)
        if(cursor){
            res.status(201).send({
                data : cursor,
                success : true,
                message: "Appointmnet list fetched successfully"
            })
        }
        else{
            res.status(201).send({
                success:false,
                message: "You haven't booked any appointmnet"
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






const updateUser =asyncHandler(async (req,res) =>{

})


module.exports={
    getUser,
    registerUser, 
    loginUser,
    //loginDean,
    updateUser,
    bookAppointment,
    yourAppointment
}
