const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const createJWT = require("../utils/auth");

const signup = (req, res, next) => {
  let { username, email, password, password_confirmation } = req.body;
  User.findOne({email: email})
    .then(foundUser => {
      if(foundUser) {
        return res.json({ Error: 'Email already exists' });
      } else {
          const user = new User({
            username: username,
            email: email,
            password: password,
          });
          bcrypt.hash(password, 10, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user.save()
            .then((response) => {
              res.json({
                success: true,
                result: response
              })
            })
            .catch((err) => {
              res.json({ Error: 'Could not save info' });
            });
          });
      };
    })
    .catch(err =>{
      res.json({ Error: err });
    });
};


const login = (req, res) => {
  let { email, password } = req.body;
  User.findOne({ email: email }).then(user => {
    if (!user) {
      return res.json({ Error: 'User not found' });
    } else {
        bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            return res.json({ Error: 'Passwords do not match' });
          } else {
            let access_token = createJWT(user.email, user._id);
            jwt.verify(access_token, process.env.TOKEN_SECRET, (err, decoded) => {
              if (err) {
                res.json({ Error: err });
              }
              if (decoded) {
                return res.json({
                  success: true,
                  token: access_token,
                  message: user
                });
              }
            });
          }
        }).catch(err => {
          res.json({ Error: err });
        });
    }
    }).catch(err => {
      res.json({ Error: err });
    });
}

module.exports = {
  signup,
  login
}