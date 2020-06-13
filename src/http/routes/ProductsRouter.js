const Product = require("../../database/models/Product");

const express = require("express");

const { Router } = express;

const products = Router();

//RUTAS

//PRODUCTS
products.get("/", async (req, res) => {
    try {
        Product.query()
        .then(products => {
            return res.status(200).json(products)
        });
    } catch (error) {
        return res.status(400).json(error);
    }
    
});
//CREATE
products.post("/", async (req, res) =>{
    const data = req.body;

    try {
        Product.query().insert({
            name: data.name,
            price: data.price
        }).then((product) => {
            return res.status(200).json(product)
        });

    } catch (error) {
        return res.status(400).json(error);
    }
   
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
//PATCH

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