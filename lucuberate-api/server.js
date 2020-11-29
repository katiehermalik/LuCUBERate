const express = require('express');
const cors = require('cors');
const routes = require("./routes");
const session = require('express-session');

require('dotenv').config();
const PORT = process.env.PORT;

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
app.use(cors(corsOptions));

app.use("/api/v1/cubes", routes.cubes);
app.use("/api/v1/users", routes.users);
app.use("/api", routes.auth);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
