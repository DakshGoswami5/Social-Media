const express = require("express")
const authRoutes = require("./routes/auth.routes")
const postRoutes = require("./routes/post.routes")
const cookieParser = require("cookie-parser")
const cors = require("cors");


const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['set-cookie']
}));

app.options('*', cors());


app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

module.exports = app;