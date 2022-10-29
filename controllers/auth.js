const User = require("../models/User");
const bcrypt = require("bcryptjs");

//------------------------------------------------- Sign Up

const signup = (req, res, next) => {
  const { username, email, password } = req.body;
  User.findOne({ email: email })
    .then(foundUser => {
      if (foundUser) {
        return res.json({ emailError: "Email already exists" });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) throw err;
          const user = new User({
            username: username,
            email: email,
            password: hash,
          });
          user
            .save()
            .then(savedUser => {
              req.session.isLoggedIn = true;
              req.session.currentUser = user._id;
              return res.json({
                isLoggedIn: req.session.isLoggedIn,
                user_Id: req.session.currentUser,
                currentUser: savedUser,
              });
            })
            .catch(err => {
              res.json({ Error: "Could not save info" });
            });
        });
      }
    })
    .catch(err => {
      res.json({ Error: err });
    });
};

// ---------------------------------------------- Login

const login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.json({ userError: "User email not found" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return res.json({ matchError: "Incorrect password" });
            } else {
              req.session.isLoggedIn = true;
              req.session.currentUser = user._id;
              return res.json({
                isLoggedIn: req.session.isLoggedIn,
                user_Id: req.session.currentUser,
                currentUser: user,
              });
            }
          })
          .catch(err => {
            res.json({ "Error with session": err });
          });
      }
    })
    .catch(err => {
      res.json({ Error: err });
    });
};

const logout = (req, res) => {
  if (req.session.currentUser) {
    req.session.destroy(err => {
      if (err) return console.log("Error destroying session");
      console.log("SESSION DESTROYED");
      res.redirect("/");
    });
  }
};

module.exports = {
  signup,
  login,
  logout,
};
