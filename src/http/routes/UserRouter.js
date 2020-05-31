const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


const User = require("../../database/models/User");

const UserRouter = (app) => {

    app.post("/api/v1/auth/register", (req, res) =>{
        
        const data = req.body;

        let token = jwt.sign({ uid: data.id }, 'coquita');   
        
        data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync());

        User.query().insert({
            username: data.username,
            email: data.email,
            password: data.password

        }).then(user => {
            delete user.password
            return res.status(200).json({ user, token })
        })
        
    });

    app.post("/api/v1/auth/login", async (req,res) => {
        const { username, password } = req.body;

        const user = await User.query().where({ username }).first();

        let token = jwt.sign({ uid: user.id }, 'coquita');
        
        const match = bcrypt.compareSync(password, user.password)
        delete user.password
        if(match) {
            return res.status(200).json({ token, user});
        } else {
            return res.status(401).json({ error: "The credentials dont match" })
        }   
    })

    app.get("/api/v1/auth/me", async (req, res) => {

        const userToken = req.headers.authorization.split(" ")[1];

        const { uid } = jwt.verify(userToken, 'coquita');
        
        const user = await User.query().findById(uid);

        delete user.password;
        
        return res.status(200).json(user)
    })
}

module.exports = UserRouter;
