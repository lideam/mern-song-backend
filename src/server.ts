import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import songRoutes from "./routes/songRoutes";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("🎵 MERN Song Manager Backend is running!");
});

// API routes
app.use("/songs", songRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
