const postModel = require("../models/post.model");
const generateCaption = require("../service/ai.service")
const uploadFile = require("../service/storage.service")
const { v4: uuid4 } = require("uuid")

async function createPostController(req,res) {
    try {
        const file = req.file;
        console.log("File received:", file);

        // Convert to base64 for AI caption generation
        const base64Image = Buffer.from(file.buffer).toString("base64");

        // Generate caption
        const caption = await generateCaption(base64Image);

        // Upload to ImageKit (it will convert buffer to base64 internally)
        const result = await uploadFile(file.buffer, `${uuid4()}`);

        // Create post in database
        const post = await postModel.create({
            caption: caption,
            image: result.url,
            user: req.user._id
        });

        res.status(201).json({
            message: "Post Created successfully",
            post
        });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({
            message: "Error creating post",
            error: error.message
        });
    }
} 

// GET user's posts
async function getUserPostsController(req, res) {
    try {
        // Current logged-in user ki posts fetch karo
        const posts = await postModel.find({ user: req.user._id })
            .sort({ createdAt: -1 }); // Latest first

        res.status(200).json({
            success: true,
            posts
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching posts",
            error: error.message
        });
    }
}

module.exports = {
    createPostController,
    getUserPostsController
}