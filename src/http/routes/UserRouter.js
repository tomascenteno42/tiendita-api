const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken");
const secret = "coquita";
const express = require("express");

const { Router } = express;

const users = Router();

const User = require("../../database/models/User");
const Product = require("../../database/models/Product");

const authMiddleware = require("../middlewares/auth");

//REGISTER
users.post("/register", (req, res) =>{

    const data = req.body;
    
    let token = jwt.sign({ uid: data.id }, secret);   
    
    data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync());
    
    User.query().insert({
        username: data.username,
        email: data.email,
        password: data.password

    }).then(user => {
        delete user.password;
        return res.status(200).json({ user, token });
    }).catch((error) => {
        return res.status(400).json({error: "There is something wrong with your credentials"})
    })
    
});
//LOGIN
users.post("/login", async (req,res) => {
    const { username, password } = req.body;
    try {
        const user = await User.query().where({ username }).first().throwIfNotFound();
        
        let token = jwt.sign({ uid: user.id }, secret);

        const match = bcrypt.compareSync(password, user.password);
        
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

//ME
users.get("/me", authMiddleware,  async (req, res) => {
    try {
        const user = await User.query().findById(req.locals).skipUndefined();
        delete user.password;

        return res.status(200).json(user);   
    } catch (error) {
        return res.status(400).json({error: "The user cant be authenticated"});
    }
})



    
module.exports = users;
