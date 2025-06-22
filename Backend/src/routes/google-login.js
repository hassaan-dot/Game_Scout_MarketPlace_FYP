import jwt from "jsonwebtoken";
import axios from "axios";
import { authenticateGoogle } from "../../google.config.js";
import User from "../models/user.js";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res
        .status(400)
        .json({ message: "Authorization code is required" });
    }

    const { tokens } = await authenticateGoogle.getToken(code);
    authenticateGoogle.setCredentials(tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
    );

    const { email, name } = userRes.data;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, username: name, password: "123456" });
      await user.save();
    }

    const token = generateToken(user._id);
    const userInfo = {
      _id: user._id,
      email: user.email,
      username: user.username,
    };

    res.redirect(
      `http://localhost:3001/oauth-success?token=${token}&user=${encodeURIComponent(
        JSON.stringify(userInfo)
      )}`
    );
  } catch (error) {
    console.error("Error during Google login:", error);
    res.redirect(`http://localhost:3001/oauth-success?error=${error}`);
  }
};

export default googleLogin;
