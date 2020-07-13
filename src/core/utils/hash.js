import bcrypt from "bcrypt";

export const hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
}

export const compareHashedPassword = (password, passwordToCompare) => {
    return bcrypt.compareSync(password, passwordToCompare);
}
