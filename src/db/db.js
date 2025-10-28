const mongoose = require("mongoose")

function connectDB(){
    mongoose.connect(process.env.MONGODB_URL)
        .then(()=>{
            console.log("Connected to DB")
        })
        .catch(err=>{
            consolle.log(err)
        })
}

module.exports = connectDB