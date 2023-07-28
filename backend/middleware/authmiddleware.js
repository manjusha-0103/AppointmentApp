const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModels')
JWT_SECRET = "hdbnmhuyr879376xhhskbbm6840820"
const protect = asyncHandler(async (req,res,next) =>{
    let token
    if(req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer'))
        {
            try{
                token = req.headers.authorization.split(' ')[1]
                //console.log(token)
                const decoded = jwt.verify(token,JWT_SECRET)
                req.user = await User.findById(decoded.id).select('-password')
                next()
            }
            catch(error){
                console.log(error)
                res.status(401)
                throw new Error('Not authorized')
            }
        }
        if(!token){
            res.status(401)
            throw new Error('Not authorized,no token')
        }
    })


module.exports = {protect}
