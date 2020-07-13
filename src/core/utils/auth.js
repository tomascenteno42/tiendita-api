require("dotenv").config();

import jwt from "jsonwebtoken";

export const signUserToken = (uid) => {
    return jwt.sign({ uid }, process.env.JWT_SECRET);
}

export const verifyUserToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}
