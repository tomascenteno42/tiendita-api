import { User } from "@models/User";

import { hashPassword, compareHashedPassword } from "@utils/hash";
import { signUserToken } from "@utils/auth";

export class AuthController {
    
    static async login (req, res) {
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
    }

    static register(req, res) {
        let { username, email, password, id } = req.body;
        
        User.query().insert({
            username,
            email,
            password: hashPassword(password)
    
        }).then(user => {
            let token = signUserToken(id);
            delete user.password;
            return res.status(200).json({ user, token });
        }).catch((error) => {
            return res.status(400).json({error: "There is something wrong with your credentials"})
        })
    }
    
    static async me(req, res) {
        try {
            const user = await User.query().findById(req.user.id).skipUndefined();
            delete user.password;
    
            return res.status(200).json(user);   
        } catch (error) {
            return res.status(400).json({error: "The user cant be authenticated"});
        }
    }
}
