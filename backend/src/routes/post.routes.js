const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const router = express.Router();
const multer = require("multer")
const {createPostController, getUserPostsController } = require("../controllers/post.controller")

const upload = multer({ storage: multer.memoryStorage() })

// ✅ GET route - User ki posts fetch karne ke liye
router.get("/", authMiddleware, getUserPostsController);

router.post("/", authMiddleware, 
    upload.single("image"), 
    createPostController)

module.exports = router;