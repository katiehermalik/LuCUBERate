const User = require('../models/User');
const bcrypt = require('bcryptjs');

//------------------------------------------------- Sign Up

const signup = (req, res, next) => {
  let { username, email, password, password_confirmation } = req.body;
  User.findOne({email: email})
    .then(foundUser => {
      if(foundUser) {
        return res.json({ Error: 'Email already exists' });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) throw err;
          const user = new User({
            username: username,
            email: email,
            password: hash,
          });
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

// ---------------------------------------------- Login

const login = (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.json({ Error: 'User not found' });
    } else {
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
          if (!isMatch) {
            return res.json({ Error: 'Passwords do not match' });
          } else {
            req.session.isLoggedIn = true;
            req.session.currentUser = user._id;
            return res.json({
              success: true,
              user: user._id,
              message: user
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



const logout = (req, res) => {
  if (req.session.currentUser) {
    req.session.destroy((err) => {
      if (err) return console.log('Error destroying session');
      console.log('SESSION DESTROYED');
      res.redirect('/');
    });
  }
}


module.exports = {
  signup,
  login,
  logout
}