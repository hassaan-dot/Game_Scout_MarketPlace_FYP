import express from "express";
import Post from "../models/createPost.js";
import dotenv from "dotenv";
import authenticateUser from "../middleWare/index.js";
import multer from "multer";

dotenv.config();

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.get("/1", authenticateUser, async (req, res) => {
  const userId = req.user.userId;

  try {
    const userPosts = await Post.find({ author: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "Posts fetched successfully",
      posts: userPosts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post(
  "/new",
  authenticateUser,
  upload.single("picture"),
  async (req, res) => {
    const userId = req.user.userId;
    console.log("User ID:", userId);

    try {
      const { title, description } = req.body;
      const picture = req.file ? req.file.filename : undefined;

      if (!title || !description) {
        return res
          .status(400)
          .json({ error: "Title and description are required" });
      }

      const existingPost = await Post.findOne({ title, author: userId });
      if (existingPost) {
        return res
          .status(409)
          .json({ error: "Duplicate post detected! Failed" });
      }

      const newPost = new Post({ title, description, picture, author: userId });
      await newPost.save();

      res.status(201).json({
        message: "Post created successfully",
        post: {
          _id: newPost._id,
          title: newPost.title,
          description: newPost.description,
          picture: newPost.picture,
          author: newPost.author,
          createdAt: newPost.createdAt,
        },
      });
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// DELETE route to delete a post by ID
router.delete("/delete/:postId", authenticateUser, async (req, res) => {
  const userId = req.user.userId;
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the logged-in user is the author of the post
    if (post.author.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this post" });
    }

    await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
