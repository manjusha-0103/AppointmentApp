const mongoose = require('mongoose')
const deanSchema = new mongoose.Schema(
  {

    email : {
      type : String,
      required : [true,'Please add a your university ID'],
      unique: true, 
    },
    uniid: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    
    //status: {
      //type: String,
      //required: true,
      //default: "pending",
    //},
    
    //day: {
      //type: String,
      //enum : ['Thusrday','Friday'],
     // required: true
    //},
    //timings :{
    //  type : Date.,
    //  //type: mongoose.Schema.Types.ObjectId,
    //  ref: 'Booking',
   // }
  },
  
    { timestamps: true }
  );

  
  module.exports = mongoose.model('Dean',deanSchema)