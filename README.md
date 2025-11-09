# 🌟 AI-Powered Social Media Platform

A full-stack social media application that uses **AI to generate captions** for images automatically. Built with the **MERN stack** and integrated with **Google Gemini AI** and **ImageKit CDN**.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-brightgreen?style=for-the-badge)
![AI Powered](https://img.shields.io/badge/AI-Google%20Gemini-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)

---

## 📸 **Project Overview**

This application allows users to:
- 🖼️ **Upload images** and get **AI-generated captions** automatically
- 🔐 Secure **authentication** with JWT cookies
- 📱 View their **personal feed** of posts
- ☁️ Store images on **ImageKit CDN** for fast delivery
- 🤖 Leverage **Google Gemini AI** for intelligent caption generation

---

## 🚀 **Live Demo**

🌐 **Frontend:** [https://social-media-gamma-opal.vercel.app](https://social-media-gamma-opal.vercel.app)  
🔗 **Backend API:** [https://social-media-csv9.onrender.com](https://social-media-csv9.onrender.com)

---

## ✨ **Features**

### 🎯 **Core Features**
- ✅ **User Authentication** (Register, Login, Logout)
- ✅ **JWT Cookie-based** sessions (secure & httpOnly)
- ✅ **AI Caption Generation** using Google Gemini 2.5 Flash
- ✅ **Image Upload** to ImageKit CDN
- ✅ **Personal Post Feed** (view your posts)
- ✅ **Responsive Design** (mobile-friendly)

### 🔒 **Security**
- 🛡️ Password hashing with **bcrypt**
- 🍪 **HTTP-only cookies** (XSS protection)
- 🔐 **CORS configured** for cross-origin requests
- 🚫 Protected routes with **authentication middleware**

### 🎨 **UI/UX**
- 🌈 Modern gradient design
- ⚡ Loading states & error handling
- 📱 Mobile-responsive navbar
- 🎭 Conditional rendering based on auth state

---

## 🛠️ **Tech Stack**

### **Frontend**
| Technology | Purpose |
|------------|---------|
| **React** | UI framework |
| **React Router** | Client-side routing |
| **Tailwind CSS** | Styling |
| **Axios** | HTTP requests |
| **Vite** | Build tool |

### **Backend**
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB** | Database |
| **Mongoose** | ODM (Object Data Modeling) |
| **JWT** | Authentication tokens |
| **bcrypt** | Password hashing |
| **Multer** | File upload handling |

### **External Services**
| Service | Purpose |
|---------|---------|
| **Google Gemini AI** | AI caption generation |
| **ImageKit** | Image CDN & storage |
| **MongoDB Atlas** | Cloud database |
| **Vercel** | Frontend hosting |
| **Render** | Backend hosting |

---

## 📂 **Project Structure**

```
SocialMedia/
├── frontend/                # React frontend
│   ├── src/
│   │   ├── api/            # Axios configuration
│   │   ├── components/     # React components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Navbar.jsx
│   │   └── App.jsx
│   ├── public/
│   └── package.json
│
└── backend/                 # Express backend
    ├── src/
    │   ├── controllers/    # Request handlers
    │   ├── models/         # MongoDB schemas
    │   ├── routes/         # API endpoints
    │   ├── middlewares/    # Auth middleware
    │   ├── service/        # AI & storage services
    │   ├── db/            # Database connection
    │   └── app.js         # Express app config
    ├── server.js          # Entry point
    └── package.json
```


## 🎯 **How It Works**

### **1. User Registration & Login**
```
User enters credentials → Backend validates → Password hashed with bcrypt
→ User created in MongoDB → JWT token generated → Sent as HTTP-only cookie
```

### **2. Creating a Post**
```
User selects image → Frontend sends to backend → Multer processes file
→ Image converted to base64 → Sent to Google Gemini AI
→ AI generates caption → Image uploaded to ImageKit CDN
→ Post saved to MongoDB (caption + image URL) → Displayed in feed
```

### **3. Authentication Flow**
```
User logs in → JWT cookie set → Cookie sent with every request
→ authMiddleware verifies token → User data attached to request
→ Protected routes accessible
```

---

## 🎓 **What I Learned**

- ✅ Full-stack application development with MERN
- ✅ JWT authentication with HTTP-only cookies
- ✅ Cross-origin request handling (CORS)
- ✅ File uploads with Multer
- ✅ AI integration (Google Gemini)
- ✅ Cloud storage (ImageKit CDN)
- ✅ Environment-based configuration
- ✅ Production deployment (Vercel + Render)

---

## 🐛 **Known Issues**

- ⏳ Cold start on Render free tier (~30s first request)

---

## 👨‍💻 **Author**

**Daksh Goswami**  
📚 B.Com Student @ SOL  
💻 Learning Full-Stack Development (MERN Stack)  
🎯 Goal: Become a Web Developer


---

## 📧 **Contact**

Have questions or suggestions? Feel free to reach out!
 
🐙 **GitHub:** [@DakshGoswami5](https://github.com/DakshGoswami5)
🎧 **LinkedIn:** [@DakshGoswami](https://www.linkedin.com/in/daksh-goswami-/)

---

<div align="center">


**Made with ❤️ and lots of ☕ by Daksh Goswami**

</div>