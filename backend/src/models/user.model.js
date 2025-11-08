const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
  },
    password:{
        type:String,
        required: true,
    }
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel