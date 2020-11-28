const jwt = require("jsonwebtoken");

const createJWT = (email, userId) => {
    const payload = {
      email,
      userId
    };
    return jwt.sign(payload, process.env.TOKEN_SECRET);
};

module.exports = createJWT;