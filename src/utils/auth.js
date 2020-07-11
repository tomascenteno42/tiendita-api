require("dotenv").config();

const jwt = require("jsonwebtoken");

const signUserToken = (uid) => {
    return jwt.sign({ uid }, process.env.JWT_SECRET);
}

const verifyUserToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { signUserToken, verifyUserToken };