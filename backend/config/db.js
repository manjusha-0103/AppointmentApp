const mongoose = require('mongoose');
const MONGO_URI="mongodb+srv://manjusha-96:pass0103@loggingapplication.fyejg.mongodb.net/?retryWrites=true&w=majority"
const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(MONGO_URI,
        {   useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`mongodb connected: ${conn.connection.host}`.blue.underline);
    }
    catch(error){
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB
