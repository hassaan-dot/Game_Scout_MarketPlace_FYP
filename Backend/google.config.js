import { google } from "googleapis";

const googleClientId =
  process.env.GOOGLE_CLIENT_ID ||
  "80208212623-adf9mq5fqb91ck26vbp8r8mk6jasqggt.apps.googleusercontent.com";
const googleClientSecret =
  process.env.GOOGLE_CLIENT_SECRET || "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";

const authenticateGoogle = new google.auth.OAuth2(
  googleClientId,
  googleClientSecret,
  "http://localhost:3000/api/auth/googlelogin"
);

export { authenticateGoogle };
