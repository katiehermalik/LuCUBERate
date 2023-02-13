let origin;
let googleSuccessUrl;
let googleFailedUrl;

if (process.env.NODE_ENV === "production") {
  origin = "https://www.lucuberate.com";
  googleSuccessUrl = `${origin}/login/success`;
  googleFailedUrl = `${origin}/login/failed`;
} else {
  origin = "http://localhost:3000";
  googleSuccessUrl = `${origin}/login/success`;
  googleFailedUrl = `${origin}/login/failed`;
}

module.exports = {
  origin,
  googleSuccessUrl,
  googleFailedUrl,
};
