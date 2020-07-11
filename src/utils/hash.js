const bcrypt = require("bcrypt");

const hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
}

const compareHashedPassword = (password, passwordToCompare) => {
    return bcrypt.compareSync(password, passwordToCompare);
}

module.exports = { compareHashedPassword, hashPassword };