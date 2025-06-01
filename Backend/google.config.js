// google.config.js
import { google } from "googleapis";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const authenticateGoogle = new google.auth.OAuth2(
  googleClientId,
  googleClientSecret,
  "http://localhost:3000/api/auth/googlelogin" // This is used for native apps
);

export { authenticateGoogle };
