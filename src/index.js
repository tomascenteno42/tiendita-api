// Dependecias nativas de NodeJS
const path = require("path");

// Dependencias (terceros)
const express = require('express');
const cors = require('cors');

const { Router } = express;

//BOOSTRAP
const bootstrap = require("./database/setup");
 
//http
const products = require("./http/routes/ProductsRouter");
const users = require("./http/routes/UserRouter");
const cart = require("./http/routes/CartRouter");

// MIDDLEWARES
const authMiddleware = require("./http/middlewares/auth");

// Express
const port = 8080;
const app = express();

const api = Router();

app.use(cors());
app.use(express.json());
    
app.use("/api/v1", api);
api.use("/auth", users);
api.use("/products", products);
api.use("/cart", authMiddleware, cart);

bootstrap(() => {
    app.listen(port, () => {
        console.log(`Escuchando en el puerto ${port}`);
    })
})