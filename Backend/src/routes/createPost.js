import express from "express";
import axios from "axios";
import { MongoClient } from "mongodb";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/post/new", async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const pageSize = 20;
  } catch (err) {
    console.error("❌ Failed to fetch paginated data:", err);
    res.status(500).json({ error: "Failed to fetch paginated data" });
  }
});
