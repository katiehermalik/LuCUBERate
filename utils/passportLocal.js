const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");
const seedData = require("../data/seed-data.json");
const bcrypt = require("bcryptjs");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  user = await db.User.findById(id).catch(err => {
    done(err, null);
  });
  if (user) done(null, user);
});

const checkUsername = str => {
  const criteria = /^[A-Za-z0-9]{3,20}$/;
  return criteria.test(str);
};

const checkPassword = str => {
  const criteria = /^(?=.*\d)(?=.*[@#%&!$*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
  return criteria.test(str);
};

const checkEmail = str => {
  const criteria =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return criteria.test(str);
};

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      if (req.body.isLoggingIn) {
        const populatedUser = await db.User.findOne({ email: email })
          .populate("categories")
          .populate("cubes");
        if (!populatedUser) {
          done(null, false, { userError: "User email not found" });
        } else {
          const isMatch = await bcrypt.compare(
            password,
            populatedUser.password
          );
          if (!isMatch) {
            done(null, false, { matchError: "Incorrect password" });
          } else {
            done(null, populatedUser);
          }
        }
      } else if (req.body.isRegistering) {
        let signupData = {};
        const addNewUserCategories = async newUser => {
          const newCategories = seedData.categories.map(category => ({
            ...category,
            user: newUser._id,
          }));
          const createdCategories = await db.Category.create(newCategories);
          createdCategories.forEach(category => {
            signupData[category.title] = category._id;
            newUser.categories.push(category._id);
          });
          await addNewUserCubes(newUser);
          const populatedUser = await db.User.findOne({ _id: newUser._id })
            .populate("categories")
            .populate("cubes");
          return populatedUser;
        };

        const addNewUserCubes = async newUser => {
          const newCubes = seedData.cubes.map(cube => ({
            ...cube,
            user: String(newUser._id),
            category: String(signupData[cube.category]),
          }));
          const createdCubes = await db.Cube.create(newCubes);
          createdCubes.forEach(async cube => {
            newUser.cubes.push(cube._id);
            const foundCategory = await db.Category.findById(cube.category);
            foundCategory.cubes.push(cube._id);
            await foundCategory.save();
          });
          await newUser.save();
          return newUser;
        };

        const { username } = req.body;
        const foundUser = await db.User.findOne({ email: email });
        if (foundUser) {
          done(null, false, { emailExistsError: "Email already exists" });
        } else {
          const usernameIsValid = checkUsername(username);
          const emailIsValid = checkEmail(email);
          const passwordIsValid = checkPassword(password);
          if (usernameIsValid && emailIsValid && passwordIsValid) {
            bcrypt.hash(password, 10, async (err, hash) => {
              if (err) throw err;
              const user = new db.User({
                username: username,
                email: email,
                password: hash,
              });
              const newUser = await user.save();
              const completedUser = await addNewUserCategories(newUser);
              done(null, completedUser);
            });
          } else {
            done(null, false, {
              usernameError: usernameIsValid
                ? null
                : "Please enter a valid username",
              passwordError: passwordIsValid
                ? null
                : "Please enter a valid password",
              emailValidationError: emailIsValid
                ? null
                : "Please enter a valid email address",
            });
          }
        }
      }
    }
  )
);
