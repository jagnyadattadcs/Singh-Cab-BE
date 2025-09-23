import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import bookingRoutes from "./routes/bookingRoutes.js"; // <-- Import new routes
import getCarDetailsRoutes from "./routes/getCarDetails.js"; // <-- Import car routes
import emailRoutes from "./routes/emailroutes.js";
import fetch from 'node-fetch';
dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const PING_URL = "https://singhcabbackend.onrender.com";
const FOURTEEN_MIN = 14 * 60 * 1000;

// Make uploads folder static
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/admin/cars", adminRoutes);
app.use("/api/bookings", bookingRoutes); // <-- Use new routes
app.use("/api/cars", getCarDetailsRoutes); 
app.use("/api/email", emailRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

// setInterval(async () => {
//   try {
//     const res = await fetch(PING_URL);
//     console.log(`[${new Date().toISOString()}] Pinged ${PING_URL} - Status:`, res.status);
//   } catch (err) {
//     console.error(`[${new Date().toISOString()}] Ping failed:`, err.message);
//   }
// }, FOURTEEN_MIN);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
