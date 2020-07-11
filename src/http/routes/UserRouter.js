const express = require("express");

const { hashPassword, compareHashedPassword } = require("../../utils/hash");
const { signUserToken } = require("../../utils/auth");

const User = require("../../database/models/User");

const authMiddleware = require("../middlewares/auth");

const { Router } = express;

const users = Router();

users.post("/register", (req, res) =>{

    const { username, email, password, id }= req.body.data;
    
    let token = signUserToken(id);

    password = hashPassword(password);
    
    User.query().insert({
        username,
        email,
        password

    }).then(user => {
        delete user.password;
        return res.status(200).json({ user, token });
    }).catch((error) => {
        return res.status(400).json({error: "There is something wrong with your credentials"})
    })
    
});

users.post("/login", async (req,res) => {
    const { username, password } = req.body;

    try {
        const user = await User.query().where({ username }).first().throwIfNotFound();
        
        let token = signUserToken(user.id);

        const match = compareHashedPassword(password, user.password);

        delete user.password;
        
        if(match) {
            return res.status(200).json({ token, user});
        } else {
            return res.status(401).json({ error: "The credentials dont match" });
        }

    } catch (error) {
        
        if (error instanceof User.NotFoundError){
            return res.status(401).json({ error: "There is no user with those credentials" });
        }
        return res.status(400).json({ error });
    }
       
});

users.get("/me", authMiddleware,  async (req, res) => {
    try {
        const user = await User.query().findById(req.user.id).skipUndefined();
        delete user.password;

        return res.status(200).json(user);   
    } catch (error) {
        return res.status(400).json({error: "The user cant be authenticated"});
    }
})

module.exports = users;