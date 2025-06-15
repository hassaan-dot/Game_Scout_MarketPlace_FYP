export const getGoogleOAuthURL = () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: "http://localhost:3000/api/auth/googlelogin", // matches your OAuth2 client
    client_id:
      "80208212623-adf9mq5fqb91ck26vbp8r8mk6jasqggt.apps.googleusercontent.com",
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
  };

  const queryString = new URLSearchParams(options).toString();
  return `${rootUrl}?${queryString}`;
};
