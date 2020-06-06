const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const express = require("express");

const { Router } = express;

const users = Router();

const { UniqueViolationError } = require('objection-db-errors');

const User = require("../../database/models/User");
const Product = require("../../database/models/Product");

users.post("/register", (req, res) =>{
    
    const data = req.body;
    
    let token = jwt.sign({ uid: data.id }, 'coquita');   
    
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

users.post("/login", async (req,res) => {
    const { username, password } = req.body;
    try {
        const user = await User.query().where({ username }).first().throwIfNotFound();
        
        let token = jwt.sign({ uid: user.id }, 'coquita');

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

users.get("/me", async (req, res) => {

    
    try {
        
        const userToken = req.headers.authorization.split(" ")[1];
        const { uid } = jwt.verify(userToken, 'coquita');
        const user = await User.query().findById(uid);
        
        delete user.password;
        return res.status(200).json(user);   
    } catch (error) {
        return res.status(400).json({error: "The user cant be authenticated"});
    }
})

users.get("/:id/cart", async (req, res) => {
    
    try {
        const user = await User.query().findById(req.params.id).withGraphFetched("products");
        return res.status(200).json(user.products);
    } catch (error) {
        return res.status(400).json({errors: "Something went wrong fetching your products"});
    }
});

users.post("/:id/cart", async (req, res) => {
    const { id, quantity } = req.body;
    
    try {
        const user = await User.query().findById(req.params.id).withGraphFetched("products");
        const product = await Product.query().findById(id);

        await user.$relatedQuery("products").relate({ id: product.id, quantity });        
        

        return res.status(200).json({ success: "Your product uploaded succesfully" });
    } catch (error) {
        console.log(error instanceof UniqueViolationError); // true

        return res.status(400).json({errors: error.details});
    }
});


module.exports = users;
