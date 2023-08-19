const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
    {
        email : {
            type : String,
            required : [true,'Please add a your email ID'],
            unique: true, 
        },
    
        uniid : {
            type : String,
            required : [true,'Please add a your university ID']
        },
        isStudent: {
            type: Boolean,
            default: false,
        },
        isDean : {
            type: Boolean,
            default: false,
        },
        password : {
            type : String,
            required : [true,'Your Password']
        },
       // appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
    },
    {
        timestamps : true,
    }
    
)
module.exports = mongoose.model('User',userSchema)