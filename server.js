const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const passport = require("passport");
require("./utils/passportConfig");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT || 4000;

const app = express();
let origin;

if (process.env.NODE_ENV === "production") {
  origin = "https://www.lucuberate.com";
} else {
  origin = "http://localhost:3000";
}

// Redirect to secure https
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https") {
      res.redirect(`https://${req.header("host")}${req.url}`);
    } else next();
  });
}

const corsOptions = {
  origin: origin,
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/lucuberate",
      ttl: 14 * 24 * 60 * 60,
      autoRemove: "native",
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production" ? true : false,
      maxAge: 1000 * 60 * 60 * 24 * 3,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/v1/cubes", routes.cubes.router);
app.use("/api/v1/users", routes.users);
app.use("/api/v1/categories", routes.categories);
app.use("/api/v1/auth", routes.auth);
app.use("/api/v1/oauth", routes.oauth);

// Serve static assets if in production vs development
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
