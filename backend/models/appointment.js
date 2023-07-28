const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
  {
    dean: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,

    },
    
    appointmentDate: {
      type: String,
      required: true,
      
    },
    //time :{
    //  type : String,
    //  required: true
    //},
    appointmentstatus: {
      type: String,
      enum: ["pending", "Done", "cancelled"],
      default: "pending",
    },
    
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);