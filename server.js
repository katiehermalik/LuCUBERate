const express = require('express');
const cors = require('cors');
const routes = require("./routes");
const session = require('express-session');

require('dotenv').config();
const PORT = process.env.PORT || 4000;

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
}

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2
  }
}));

app.use(express.json());
app.use(express.static(`${__dirname}/lucuberate-client/build`))
app.use(cors(corsOptions));

app.use("/api/v1/cubes", routes.cubes);
app.use("/api/v1/users", routes.users);
app.use("/api", routes.auth);

app.get("*", (req, res) => {
  res.sendFile(`${__dirname}/lucuberate-client/public/index.html`);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
