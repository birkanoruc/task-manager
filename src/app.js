const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middlewares/errorMiddleware");
const app = express();
require("dotenv").config();

// Middlewares
app.use(cors());
app.use(express.json());

// Error handling middleware
app.use(errorHandler);

// Test route
app.get("/api/ping", (req, res) => {
  res.json({ message: "Pong!" });
});

// Auth routes
app.use("/api/auth", authRoutes);

// User routes
app.use("/api/user", userRoutes);

// Task routes
app.use("/api/tasks", taskRoutes);

// MongoDB'ye bağlan
connectDB();

// Sunucu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
