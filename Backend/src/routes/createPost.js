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

router.get("/1", async (req, res) => {
  try {
    const allPosts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "username email")
      .populate("comments.user", "username email");

    res.status(200).json({
      message: "All posts fetched successfully",
      posts: allPosts,
    });
  } catch (error) {
    console.error("Error fetching all posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/new", upload.single("picture"), async (req, res) => {
  if (!req.body || !req.body.userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token missing or invalid" });
  }

  try {
    const { title, description, price, userId } = req.body;
    const picture = req.file ? req.file.filename : null;

    console.log("Received Data:", { title, description, price, picture });

    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    if (!picture) {
      return res.status(400).json({ error: "Picture is required" });
    }

    if (price && isNaN(price)) {
      return res.status(400).json({ error: "Price must be a valid number" });
    }

    const existingPost = await Post.findOne({ title, author: userId });
    if (existingPost) {
      return res.status(409).json({ error: "Duplicate post detected! Failed" });
    }

    const newPost = new Post({
      title,
      description,
      price,
      picture,
      author: userId,
    });

    await newPost.save();

    res.status(201).json({
      message: "Post created successfully",
      post: {
        _id: newPost._id,
        title: newPost.title,
        description: newPost.description,
        price: newPost.price,
        picture: newPost.picture,
        author: newPost.author,
        createdAt: newPost.createdAt,
      },
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put(
  "/update/:postId",
  authenticateUser,
  upload.single("picture"),
  async (req, res) => {
    const userId = req.user.userId;
    const { postId } = req.params;
    const { title, description, price } = req.body;
    const newPicture = req.file ? req.file.filename : null;

    try {
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      if (post.author.toString() !== userId) {
        return res
          .status(403)
          .json({ error: "Unauthorized to update this post" });
      }
      if (price && isNaN(price)) {
        return res.status(400).json({ error: "Price must be a valid number" });
      }
      if (title) post.title = title;
      if (description) post.description = description;
      if (price) post.price = price;

      if (newPicture) post.picture = newPicture;

      await post.save();

      res.status(200).json({
        message: "Post updated successfully",
        post: {
          _id: post._id,
          title: post.title,
          price: post.price,
          description: post.description,
          picture: post.picture,
          author: post.author,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        },
      });
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.delete("/delete", async (req, res) => {
  const { userId, postId } = req.body;
  console.log("delete", userId, req.body);

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

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

router.post("/comment/:postId", authenticateUser, async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.userId;
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Comment text is required" });
  }

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = {
      user: userId,
      text,
      createdAt: new Date(),
    };
    post.comments.push(comment);

    await post.save();

    res.status(201).json({
      message: "Comment added successfully",
      comments: post.comments,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
