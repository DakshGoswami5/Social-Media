const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    image:String,
    caption:String,
    user:{
        type:mongoose.Schema.Types.ObjectID,
        ref:"users"
    }
}, {
    timestamps: true  // ✅ createdAt aur updatedAt auto add ho jayenge
})

const postModel = mongoose.model("post", postSchema)

module.exports = postModel;