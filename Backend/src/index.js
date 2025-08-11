import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/authRoutes.js";
import CreatePost from "./routes/createPost.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import googleLogin from "./routes/google-login.js";
// import { ZenRows } from "zenrows";

dotenv.config();

const app = express();

const upload = multer({ dest: "uploads/" });

// (async () => {
//   const client = new ZenRows(
//     process.env.ZENROWS_API_KEY || "3a502ef7cec8773b7ec218c62fd7269929645aba"
//   );
//   const url = "https://dlcompare.com";

//   try {
//     const response = await client.get(url);
//     const data = response; // Correct way to access response content
//     console.log("ZenRows success:", data);
//   } catch (error) {
//     console.error("ZenRows error:", error.message);
//     if (error.response) {
//       console.error("ZenRows response:", error.response.data);
//     }
//   }
// })();

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

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);

app.get("/api/auth/googlelogin", googleLogin);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/post", CreatePost);

app.get("/", upload.single("avatar"), (req, res) => {
  res.send("Welcome to the API");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  connectDB();
});
