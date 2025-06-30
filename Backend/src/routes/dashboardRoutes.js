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
    console.error("MongoDB connection error:", error);
    process.exit(1);
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
    console.error("Failed to fetch paginated data:", err);
    res.status(500).json({ error: "Failed to fetch paginated data" });
  }
});

router.post("/search/:page", async (req, res) => {
  try {
    if (!collection) {
      return res.status(500).json({ error: "Database not connected" });
    }

    const page = parseInt(req.params.page);
    const pageSize = 20;

    if (isNaN(page) || page < 1) {
      return res.status(400).json({ error: "Page must be a positive integer" });
    }

    const input = req.body.input?.toLowerCase().trim();
    if (!input || input.length < 2) {
      return res
        .status(400)
        .json({ error: "Input string is too short or missing" });
    }

    const skip = (page - 1) * pageSize;
    let data, totalItems;

    const gameSupportFields = [
      "catalog-game-support",
      "catalog-game-support 2",
      "catalog-game-support 3",
      "catalog-game-support 4",
      "catalog-game-support 5",
      "catalog-game-support 6",
      "catalog-game-support 7",
      "catalog-game-support 8",
      "catalog-game-support 9",
      "catalog-game-support 10",
    ];

    const platformAliases = {
      xbox: ["xboxone", "xbox series x"],
      ps4: ["ps4"],
      ps5: ["ps5"],
      switch: ["switch"],
      pc: ["pc"],
    };

    if (input === "lowest price") {
      totalItems = await collection.countDocuments({
        price: { $exists: true },
      });
      data = await collection
        .find({ price: { $exists: true } })
        .sort({ price: 1 })
        .skip(skip)
        .limit(pageSize)
        .toArray();
    } else if (input === "high ratings") {
      totalItems = await collection.countDocuments({
        rating: { $exists: true },
      });
      data = await collection
        .find({ rating: { $exists: true } })
        .sort({ rating: -1 })
        .skip(skip)
        .limit(pageSize)
        .toArray();
    } else if (input === "discounted") {
      totalItems = await collection.countDocuments({
        $expr: { $lt: ["$price", "$originalPrice"] },
      });
      data = await collection
        .find({ $expr: { $lt: ["$price", "$originalPrice"] } })
        .skip(skip)
        .limit(pageSize)
        .toArray();
    } else if (Object.keys(platformAliases).includes(input)) {
      const platforms = platformAliases[input];
      const query = {
        $or: gameSupportFields.flatMap((field) =>
          platforms.map((platform) => ({
            [field]: { $regex: new RegExp(`^${platform}$`, "i") },
          }))
        ),
      };
      totalItems = await collection.countDocuments(query);
      data = await collection.find(query).skip(skip).limit(pageSize).toArray();
    } else {
      const searchFields = ["name", "catalog-shop-name", ...gameSupportFields];
      const query = {
        $or: searchFields.map((field) => ({
          [field]: { $regex: input, $options: "i" },
        })),
      };
      totalItems = await collection.countDocuments(query);
      data = await collection.find(query).skip(skip).limit(pageSize).toArray();
    }

    const totalPages = Math.ceil(totalItems / pageSize);

    res.json({
      currentPage: page,
      totalPages,
      pageSize,
      totalItems,
      data,
    });
  } catch (err) {
    console.error("Search failed:", err);
    res
      .status(500)
      .json({ error: "Search failed due to internal server error" });
  }
});

router.post("/search/:page", async (req, res) => {
  try {
    if (!collection) {
      return res.status(500).json({ error: "Database not connected" });
    }

    const page = parseInt(req.params.page);
    const pageSize = 20;

    if (isNaN(page) || page < 1) {
      return res.status(400).json({ error: "Page must be a positive integer" });
    }

    const input = req.body.input?.toLowerCase().trim();
    if (!input || input.length < 2) {
      return res
        .status(400)
        .json({ error: "Input string is too short or missing" });
    }

    const skip = (page - 1) * pageSize;
    let data, totalItems;

    const gameSupportFields = [
      "catalog-game-support",
      "catalog-game-support 2",
      "catalog-game-support 3",
      "catalog-game-support 4",
      "catalog-game-support 5",
      "catalog-game-support 6",
      "catalog-game-support 7",
      "catalog-game-support 8",
      "catalog-game-support 9",
      "catalog-game-support 10",
    ];

    if (input === "lowest price") {
      totalItems = await collection.countDocuments({
        price: { $exists: true },
      });
      data = await collection
        .find({ price: { $exists: true } })
        .sort({ price: 1 })
        .skip(skip)
        .limit(pageSize)
        .toArray();
    } else if (input === "high ratings") {
      totalItems = await collection.countDocuments({
        rating: { $exists: true },
      });
      data = await collection
        .find({ rating: { $exists: true } })
        .sort({ rating: -1 })
        .skip(skip)
        .limit(pageSize)
        .toArray();
    } else if (input === "discounted") {
      totalItems = await collection.countDocuments({
        $expr: { $lt: ["$price", "$originalPrice"] },
      });
      data = await collection
        .find({
          $expr: { $lt: ["$price", "$originalPrice"] },
        })
        .skip(skip)
        .limit(pageSize)
        .toArray();
    } else if (["ps5", "ps4"].includes(input)) {
      const query = {
        $or: gameSupportFields.map((field) => ({
          [field]: { $regex: new RegExp(`^${input}$`, "i") },
        })),
      };
      totalItems = await collection.countDocuments(query);
      data = await collection.find(query).skip(skip).limit(pageSize).toArray();
    } else {
      const searchFields = ["name", "catalog-shop-name", ...gameSupportFields];
      const query = {
        $or: searchFields.map((field) => ({
          [field]: { $regex: input, $options: "i" },
        })),
      };
      totalItems = await collection.countDocuments(query);
      data = await collection.find(query).skip(skip).limit(pageSize).toArray();
    }

    const totalPages = Math.ceil(totalItems / pageSize);

    res.json({
      currentPage: page,
      totalPages,
      pageSize,
      totalItems,
      data,
    });
  } catch (err) {
    console.error(" Search failed:", err);
    res
      .status(500)
      .json({ error: "Search failed due to internal server error" });
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
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192", // <-- update here with a supported model name
        messages: [{ role: "user", content: message }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${
            process.env.GROQ_API_AI_KEY ||
            "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"
          }`,
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
