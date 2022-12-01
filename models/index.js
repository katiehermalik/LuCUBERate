const mongoose = require("mongoose");

const connectionString =
  process.env.MONGODB_URI || "mongodb://127.0.0.1/lucuberate";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(connectionString, configOptions)
  .then(() => console.log("MongoDB successfully connected..."))
  .catch(err => console.log(`MongoDB connection error: ${err}`));

module.exports = {
  User: require("./User"),
  Cube: require("./Cube"),
  Category: require("./Category"),
};
