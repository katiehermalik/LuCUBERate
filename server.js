const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const session = require("express-session");
const path = require("path");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

const app = express();

let origin;
if (process.env.NODE_ENV === "production") {
  origin = "https://lucuberate.com";
} else {
  origin = "http://localhost:3000";
}

const corsOptions = {
  origin: origin,
};

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2,
    },
  })
);

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/v1/cubes", routes.cubes.router);
app.use("/api/v1/users", routes.users);
app.use("/api/v1/categories", routes.categories);
app.use("/api", routes.auth);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("lucuberate-client/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "lucuberate-client", "build", "index.html")
    );
  });
} else {
  app.use(
    express.static(path.join(__dirname, "lucuberate-client", "src", "images"))
  );
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
