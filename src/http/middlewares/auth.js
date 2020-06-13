const jwt = require('jsonwebtoken');
const secret = "coquita";
const User = require("../../database/models/User");

const authMiddleware = async (req, res, next) => {
    try {
        const userToken = req.headers.authorization.split(" ")[1];
        const { uid } = jwt.verify(userToken, secret);
        const user = await User.query().findById(uid).skipUndefined();
        if(user) {
            req.user = uid;
            next();
        } else {
            throw "No user was found";
        }
        
        
    } catch (error) {
        res.status(401).json(error);
    }
}

module.exports = authMiddleware;
