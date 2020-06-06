const Product = require("../../database/models/Product");

const express = require("express");

const { Router } = express;

const products = Router();

//RUTAS
products.get("/", (req, res) => {
    Product.query()
        .then(products => {
            return res.status(200).json(products)
        });
});

products.post("/", (req, res) =>{
    
    const data = req.body;
    Product.query().insert({
        name: data.name,
        price: data.price
    }).then(product => {
        return res.status(200).json(product)
    })
});

//SHOW
products.get("/:productId", (req, res) => {
    Product.query().findById(req.params.productId)
        .then(product => {
            if(product) {
                return res.status(200).json(product)
            } else {
                return res.status(404).json({error: `No se a encontrado el producto con id ${req.params.productId}`});
            }
        });
});

//DELETE
products.delete("/:productId", (req, res) =>{
    Product.query().deleteById(req.params.productId)
        .then(productId =>{
            if (productId === 0) {
                return res.status(404).json({error: `No se a encontrado el producto con id ${req.params.productId}`});
            }
            return res.status(200).json({ success: `Se borro el producto con ID ${req.params.productId}`});
        })
})

products.patch("/:productId", (req, res) =>{
    Product.query()
        .patchAndFetchById(req.params.productId, {
            name: req.body.name || undefined,
            price: req.body.price || undefined
        }).then(product => {

            if (!product) {
                return res.status(404).json({error: `No se a encontrado el producto con id ${req.params.productId}`});
            }
            
            return res.status(200).json(product);
        })
});

module.exports = products;