export const getGoogleOAuthURL = () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: "http://localhost:3000/api/auth/googlelogin", // MUST match backend route
    client_id:
      "80208212623-adf9mq5fqb91ck26vbp8r8mk6jasqggt.apps.googleusercontent.com",
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  const queryParams = new URLSearchParams(options).toString();
  return `${rootUrl}?${queryParams}`;
};
