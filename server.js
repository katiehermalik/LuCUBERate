const express = require('express');
const cors = require('cors');
const routes = require("./routes");
const session = require('express-session');
const path = require('path');

require('dotenv').config();
const PORT = process.env.PORT || 4000;

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'http://shielded-waters-87290.herokuapp.com/']
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

// Use Routes
app.use("/api/v1/cubes", routes.cubes);
app.use("/api/v1/users", routes.users);
app.use("/api", routes.auth);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('lucuberate-client/build'));
  
  app.get("*", (req, res) => {
    res.sendFile(__dirname, 'lucuberate-client', 'build', 'index.html');
  });
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
