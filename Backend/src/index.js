import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import googleLogin from "./routes/google-login.js";

dotenv.config();

const app = express();

const upload = multer({ dest: "uploads/" });

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/auth", authRoutes);

app.get("/api/auth/googlelogin", googleLogin);

app.use("/api/dashboard", dashboardRoutes);

app.get("/", upload.single("avatar"), (req, res) => {
  res.send("Welcome to the API");
});

console.log("✅ MongoDB connected");

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  connectDB();
});
