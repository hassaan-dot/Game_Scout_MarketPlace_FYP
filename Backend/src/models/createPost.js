import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const postSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    picture: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [commentSchema], // 🆕 Add comments as subdocuments
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
