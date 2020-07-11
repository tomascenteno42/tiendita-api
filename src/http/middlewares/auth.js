const { verifyUserToken } = require("../../utils/auth");
const User = require("../../database/models/User");

const authMiddleware = async (req, res, next) => {
    try {
        const userToken = req.headers.authorization.split(" ")[1];
        const { uid } = verifyUserToken(userToken);
        const user = await User.query().findById(uid).skipUndefined();
        if(user) {
            req.user = user;
            next();
        } else {
            throw "No user was found";
        }
        
        
    } catch (error) {
        res.status(401).json(error);
    }
}

module.exports = authMiddleware;
