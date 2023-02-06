const router = require("express").Router();
const passport = require("passport");

let successLoginUrl;
let errorLoginURL;
if (process.env.NODE_ENV === "production") {
  successLoginUrl = "https://www.lucuberate.com/login/success";
  errorLoginURL = "https://www.lucuberate.com/login/success";
} else {
  successLoginUrl = "http://localhost:3000/login/success";
  errorLoginURL = "http://localhost:3000/login/failed";
}

// routes - /api/v1/oauth

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: successLoginUrl,
    failureRedirect: errorLoginURL,
    failureMessage: "Cannot login with Goggle, please try again.",
  })
);

router.get("/user", (req, res) => {
  res.json(req.user);
});

module.exports = router;
