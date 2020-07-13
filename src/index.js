import path from "path";

import express, { Router } from "express";
import cors from "cors";

import { bootstrap } from "./database/setup";

import { products } from "@http/routes/ProductsRouter"; 
import { users } from "@http/routes/UserRouter"; 
import { cart } from "@http/routes/CartRouter"; 

import { authMiddleware } from "@http/middlewares/auth";

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