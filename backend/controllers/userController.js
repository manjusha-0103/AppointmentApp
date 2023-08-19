const User = require('../models/userModels')
const Dean = require('../models/dean')
const Booking = require('../models/appointment')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs');
const moment = require('moment');

const otpGenerator = require('otp-generator')
JWT_SECRET = "hdbnmhuyr879376xhhskbbm6840820"
const sendEmail = require('../utils/sendEmail')




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
    const {email,uniid, isStudent,isDean,password} = req.body
    if(!email||!uniid || !password){
        res.status(201)
        throw new Error ('Please add all the fields')
    }
    else{
        const salt = await bcrypt.genSalt(10)
        //console.log(salt)
        const hashedPassword = await bcrypt.hash(password,salt)
        const msg = `
            <div>
                <h1 style="color: orange; text-align:center">Congratulations! You have registered successfully with account ${email}!</h1>
            </div>
            
            <div style="text-align: center; font-size: 18px">
                <p>You have been registered successfully with account ${email}!</p>
                <a href="http://localhost:3000/login">Click here to login.</a>
            </div>
        `;
        const subject =  `AppointmenApp|| Registration successfull`;
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
                    email,
                    uniid ,
                    //timings,
                    password : hashedPassword
                    
                })
                if(dean){
                    sendEmail(email,subject,"HELLO!!",msg)
                    res.status(201).send({
                        success : true,
                        message : "Dean registered succcessfully",
                            _id : dean._id ,
                        uniid : dean.uniid,
                        email : dean.email,
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
                    email,
                    uniid ,
                    isStudent,
                    password : hashedPassword
                    
                })
                if(user){
                    sendEmail(email,subject,"HELLO!!",msg)
                    res.status(201).send({
                        success : true,
                        message : "Student registered succcessfully",
                            _id : user._id ,
                    isStudent : user.isStudent,
                        uniid : user.uniid,
                        email : user.email,
                        token : generateToken(user._id)
                    })
                }
                
                else{
                    res.status(400);
                    throw new Error('Invalid user data');
                }
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
    if(!uniid || !password){
        res.status(201)
        throw new Error ('Please add all the fields')
    }
    const user = await (User.findOne({uniid}))
    if(user && (await bcrypt.compare(password,user.password)) && user.isStudent){
        res.status(201).send({
             success : true,
             message : "Student logged in succcessfully",
                 _id : user._id,
           isStudent : user.isStudent,
               uniid : user.uniid,
               email : user.email,
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
                  email : dean.email,
                  token : generateToken(dean._id)
            
            })
        }
        else{
            res.status(201).send({
                success : false,
                message : "Invalid credential or create your account",
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
const createSession = (req, res) => {
    const session = req.session;
    session.userId = 1;
    session.expiresIn = 60 * 60 * 24; // expires in 24 hours
    res.cookie('connect.sid', session.sid, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + session.expiresIn * 1000),
    });
  };
let linkExpirationTime = null; 
const preresetPassword = asyncHandler(async(req,res)=>{
    try{
        const email = req.body.email;
        const expirationMinutes = 5;
        linkExpirationTime = new Date(Date.now() + expirationMinutes * 60000);
        
        const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
        const subject = `AppointmentApp|| Changed Password Link`;
        const msg = `
            <div>
                <h1 style="color: orange; text-align:center">Link for changing password of account ${email}!</h1>
            </div>
        
            <div style="text-align: center; font-size: 18px">
                <p>From AppointmentApp you are getting the link to change password of account ${email}</p>
                <p><a href="http://localhost:3000/reset-pass/${otp}+link=hxh">Click here</a> to change password.</p>
            </div>
        `;
        sendEmail(email,subject,"HELLO!!",msg);
        res.status(201).send({
            success : true,
            message : `Email is sent on gmail acount ends with *********${(email.split('@')[0]).slice(-4)}.gmail.com`,
            
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            message : error.message,
            success : false
        })
    }

})
const verifyOtp =asyncHandler(async (req,res,email) =>{
    try{
        await sendOtp(email)
        const { code } = req.body.otp;
        if(parseInt(code) === parseInt(req.params.otp)){
            sessionStorage.removeItem("OTP") // start session for reset password
            res.status(200).send({
                message: "OTP verified",
                success : true
            })
            return true
        }
        else{
            res.status(200).send({
                message: "Invalid OTP",
                success : false
            })
            return false
        }
    }
    catch(error){
        console.log(error)
        
    }

})
const sendOtp = async (req,res,email) =>{
    try {
        //const email = email;
        //if (!validateEmail(email)) {
           // throw new Error("Invalid email address");
        //}

        const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
        //req.sessionStorage
        //const session = req.session;
        //session.otp = otp;
        //res.cookie('connect.sid', session.sid, {
        //    httpOnly: true,
        //    secure: true,
        //    expires: new Date(Date.now() + session.expiresIn * 1000),
        //});

        //req.sessionStorage.setItem("OTP", otp);
        const subject = "AppointmenApp|| Sending One Time Password (OTP) for verification"
        const msg = `
            <div style="text-align: center; font-size: 18px">
                <p>Here is Your One Time Password for verification!</p>
                <h2>${otp}</h2>
                <p><a href="http://localhost:3000/verify-otp/${otp}">Click here</a> to verify OTP</p>
            </div>
        `;
        await sendEmail(email, subject, "HELLO!", msg);
        res.status(201).send({
            success: true,
            message: "OTP send"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error sending OTP"
        });
    }
};
const resetPassword = asyncHandler(async(req,res)=>{
    try{
    
        const {email,cpassword } = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(cpassword,salt)
        const msg = `
            <div>
                <h1 style="color: orange; text-align:center">Congratulations! Password has been changed successfully with account ${email}!</h1>
            </div>
              
            <div style="text-align: center; font-size: 18px">
                <p>Password has been change successfully with account ${email}!</p>
                <p><a href="http://localhost:3000/login">Click here</a> to login with new password</p>
            </div>
        `
        const subject =  `AppointmenApp|| Password Changed`;
        try{
            //const linkExpirationTime = req.params.linkExpirationTime
            if ( (linkExpirationTime > new Date())){
                const user = await (User.findOne({email}));
                if(user){
                    try{
                        //const verify = await verifyOtp();
                        //await sendOtp(email)
                        //if(await verifyOtp(email)){
                            await sendEmail(email,subject,"HELLO!!",msg);
                            const cursor = await (User.findOneAndUpdate({email},{password:hashedPassword}));
                            if(cursor){
                                res.status(201).send({
                                    data : cursor,
                                    message : "Password reset Successfully",
                                    success : true, 
                                })
                            }
                            else{
                                throw new Error("Failed to update user password");
                            }
                        //}
                        /*else{
                            res.status(201).send({
                                
                                message : "OTP not send",
                                success : false, 
                            }) 
                        }*/
                    }
                    catch(error){
                        console.log(error)
                            //res.status(200).send
                    }
                        
                }
                    
        
                else if(await (Dean.findOne({email}))){
                    try{
                        //await sendOtp(email);
                        //const verify = (verifyOtp(email));
                        //if(verify){
                            //req.locals.resetSession = false
                            sendEmail(email,subject,"HELLO!!",msg);
                            const cursor = await (Dean.findOneAndUpdate({email},{password:hashedPassword}));
                            if(cursor){
                                res.status(201).send({
                                    data : cursor,
                                    message : "Password reset Successfully",
                                    success : true, 
                                })
                            }
                            else{
                                throw new Error("Failed to update user password");
                            }
                        /*}else{
                            res.status(201).send({
                                message : "OTP not send",
                                success : false, 
                            }) 
                        }*/
                    }
                    catch(error){
                        console.log(error)
                        //res.status(200).send
                    }
                }
                else{
                    res.status(401).send({
                        
                        message : "You Need to first register yourself with this current email id",
                        success : false
                    })
                }    
            }
            else{
                res.status(200).send(
                    {
                        success:false,
                        message: "Session expired"
                    }
                )
            }
        }
        catch(error){
            console.log(error)
        }
    }catch(error){
        console.log(error)
    }
})
const bookAppointment= asyncHandler(async(req,res)=>{

    try{
        console.log(req.body)
        req.body.appointmentDate = moment(req.body?.appointmentDate, "YYYY-MM-DD").toISOString();
        req.body.appointmentstatus =  "pending";
        const c = await (Booking.find({}).count()) ;
        if (c === 0){
            const newappointment = new Booking(req.body);
            await newappointment.save();
        }
        else{
        
            const available = await (availableAppoinment(req.body?.appointmentDate,req.body?.dean));
            console.log(available);
            if (available){
                const newappointment = new Booking(req.body)
                await newappointment.save()
                const date = moment(req.body.appointmentDate).utc().format('DD-MM-YYYY');
                const subject = `AppointmenApp|| Scheduled appointment with ${req.body.dean}`;
                const msg = `
              
                    <div style="display: block; margin-left: auto; margin-right: auto; width: 44%">
                        <img style="object-fit: cover" height="250px" width="500px" src="https://cdn.dribbble.com/users/4358240/screenshots/14825308/media/84f51703b2bfc69f7e8bb066897e26e0.gif" />
                    </div>
                
                    <div>
                        <h1 style="color: orange; text-align:center">Congratulations! Your Appointment has been scheduled with ${req.body.dean}!</h1>
                    </div>
                
                    <div style="text-align: center; font-size: 18px">
                        <p>We are happy to inform that your appointment has been scheduled!</p>
                        <p>You can meet up with dean with following link on ${date} at 10AM. It's one hour meet</p>
                        <a href="http://localhost:3000/ngoLogin">Click here to join</a>
                    </div>
                
                `;
                
                    sendEmail(newappointment.user_mail,subject,"HELLO!",msg)
                    res.status(200).send({
                        success :true,
                        message : "appointment book succesfully"
                    });
                
                
            }
            else{
                res.status(200).send({
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
        //await console.log(req.body.data.uniid);
        const user = req.body.data?.uniid
        const cursor= await (Booking.find({user:user,appointmentstatus:'pending'}))
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

const cancelAppointmentby = asyncHandler(async(req,res)=>{
    try{
        const id = req.body?.dean;
        const date = req.body?.date;
        //console.log(id)
        const cursor = await( (Booking.find({dean : id,appointmentDate:date})).deleteOne({appointmentstatus:"pending"}));
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







const updateUser =asyncHandler(async (req,res) =>{

})


module.exports={
    getUser,
    registerUser, 
    loginUser,
    //loginDean,
    updateUser,
    bookAppointment,
    yourAppointment,
    cancelAppointmentby,
    resetPassword,
    preresetPassword,
    verifyOtp,
    createSession

}
