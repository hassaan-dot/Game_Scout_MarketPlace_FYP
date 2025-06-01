import express from "express";
import axios from "axios";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let collection;

async function connectToMongo() {
  try {
    await client.connect();
    console.log("✅ MongoDB connected");

    const database = client.db("FYP");
    collection = database.collection("products");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Exit if DB connection fails
  }
}
connectToMongo();

router.post("/data/:page", async (req, res) => {
  try {
    if (!collection) {
      return res.status(500).json({ error: "Database not connected" });
    }

    const page = parseInt(req.params.page);
    const pageSize = 20;

    if (isNaN(page) || page < 1) {
      return res.status(400).json({ error: "Invalid page number" });
    }

    const skip = (page - 1) * pageSize;

    const totalItems = await collection.countDocuments();
    const totalPages = Math.ceil(totalItems / pageSize);

    const data = await collection.find({}).skip(skip).limit(pageSize).toArray();

    res.json({
      currentPage: page,
      totalPages,
      pageSize,
      totalItems,
      data,
    });
  } catch (err) {
    console.error("❌ Failed to fetch paginated data:", err);
    res.status(500).json({ error: "Failed to fetch paginated data" });
  }
});

router.post("/chatBot", async (req, res) => {
  try {
    const { message } = req.body;
    console.log("Received message request:", message);

    if (!message) {
      return res.status(400).json({ message: "Send any message." });
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1:free",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (error) {
    console.error(
      "Error during chatBot processing:",
      error.response?.data || error.message
    );
    res.status(500).json({ message: "Failed to process chat." });
  }
});

export default router;
