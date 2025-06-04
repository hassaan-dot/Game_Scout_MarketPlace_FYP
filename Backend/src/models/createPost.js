import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    picture: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assumes your user model is named "User"
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
