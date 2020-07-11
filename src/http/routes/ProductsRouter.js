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
    const { name, price } = req.body;

    try {
        Product.query().insert({
            name,
            price 
        }).then((product) => {
            return res.status(200).json(product)
        });

    } catch (error) {
        return res.status(400).json(error);
    }
   
});

//SHOW
products.get("/:product_id", (req, res) => {
    const { product_id } = req.params.product_id;
    Product.query().findById(product_id)
        .then(product => {
            if(product) {
                return res.status(200).json(product)
            } else {
                return res.status(404).json({error: `No se a encontrado el producto con id ${req.params.product_id}`});
            }
        });
});

//DELETE
products.delete("/:product_id", (req, res) =>{
    const { product_id } = req.params.product_id;

    Product.query().deleteById(product_id)
        .then(product_id =>{
            if (product_id === 0) {
                return res.status(404).json({error: `No se a encontrado el producto con id ${req.params.product_id}`});
            }
            return res.status(200).json({ success: `Se borro el producto con ID ${req.params.product_id}`});
        })
})
//PATCH

products.patch("/:product_id", (req, res) =>{
    const { name, price } = req.body;
    const { product_id } = req.params.product_id;
    Product.query()
        .patchAndFetchById(req.params.product_id, {
            name: name || undefined,
            price: price || undefined
        }).then(product => {

            if (!product) {
                return res.status(404).json({error: `No se a encontrado el producto con id ${req.params.product_id}`});
            }
            
            return res.status(200).json(product);
        })
});

module.exports = products;