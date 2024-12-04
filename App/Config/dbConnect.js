const mongoose = require('mongoose');

const dbConnect = async(req,res)=>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("The Database is Connected Successfully");
        
    }catch(error){
        console.log("Failed to Connect With the Database:" ,error);
        
    }
}

module.exports = dbConnect;