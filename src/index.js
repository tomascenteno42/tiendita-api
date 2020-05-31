// Dependecias nativas de NodeJS
const path = require("path");

// Dependencias (terceros)
const express = require('express');
const cors = require('cors');

// Database 
const ProductsRouter = require("./http/routes/ProductsRouter");
const UserRouter = require("./http/routes/UserRouter");

// Express
const port = 8080;
const app = express();

// Configuramos la api para que pueda recibir data por POST en formato JSON
app.use(express.json());
app.use(cors());

//BOOSTRAP
const bootstrap = require("./database/setup");

// Rutas de la API

ProductsRouter(app);
UserRouter(app);


bootstrap(() => {
    app.listen(port, () => {
        console.log(`Escuchando en el puerto ${port}`);
    })
})