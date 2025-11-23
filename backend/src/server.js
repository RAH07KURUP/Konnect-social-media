import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5001;

// Read from env
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Detect if FRONTEND_URL is meant to be a regex (starts and ends with / /)
let corsOrigin = FRONTEND_URL;

if (FRONTEND_URL.startsWith("/") && FRONTEND_URL.endsWith("/")) {
  // Extract content inside slashes → convert to regex
  const pattern = FRONTEND_URL.slice(1, -1);  
  corsOrigin = new RegExp(pattern);
  console.log("Using REGEX for CORS:", corsOrigin);
} else {
  console.log("Using STRING for CORS:", corsOrigin);
}

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);


app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  connectDB();
});
