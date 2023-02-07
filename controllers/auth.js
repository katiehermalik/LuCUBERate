const db = require("../models");
const seedData = require("../data.json");
const bcrypt = require("bcryptjs");

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

//------------------------------------------------- Sign Up

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const foundUser = await db.User.findOne({ email: email });
  if (foundUser) {
    return res.json({ emailError: "Email already exists" });
  } else {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) throw err;
      const user = new db.User({
        username: username,
        email: email,
        password: hash,
      });
      const newUser = await user.save();
      const completedUser = await addNewUserCategories(newUser);
      req.session.isLoggedIn = true;
      req.session.currentUser = user._id;
      return res.json({
        isLoggedIn: req.session.isLoggedIn,
        user_Id: req.session.currentUser,
        currentUser: completedUser,
      });
    });
  }
};

// ---------------------------------------------- Login

const login = async (req, res) => {
  const populatedUser = await db.User.findOne({ email: req.body.email })
    .populate("categories")
    .populate("cubes");
  if (!populatedUser) {
    return res.json({ userError: "User email not found" });
  } else {
    const isMatch = await bcrypt.compare(
      req.body.password,
      populatedUser.password
    );
    if (!isMatch) {
      return res.json({ matchError: "Incorrect password" });
    } else {
      req.session.isLoggedIn = true;
      req.session.currentUser = populatedUser._id;
      return res.json({
        isLoggedIn: req.session.isLoggedIn,
        user_Id: req.session.currentUser,
        currentUser: populatedUser,
      });
    }
  }
};

const logout = (req, res, next) => {
  req.logout(req.user, err => {
    if (err) return next(err);
  });
  // res.clearCookie("connect.sid");
  res.send({ isAuth: req.isAuthenticated(), user: req.user });
};

module.exports = {
  signup,
  login,
  logout,
};
