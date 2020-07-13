import { Product } from "../../database/models/Product";

import { DuplicateEntriesError } from "../../errors/DuplicateEntriesError"

export class ProductController {

    static async index(req, res){
        try {
            Product.query()
                .then(products => {
                    return res.status(200).json(products)
                });
        } catch (error) {
            return res.status(400).json(error);
        }
    }
    
    static async create(req, res) {
        const { name, price } = req.body;
        try {            
            const product = await Product.query().findOne({ name });
            if(product.name === name) {
                throw new DuplicateEntriesError;
            }
            Product.query().insert({
                name,
                price 
            }).then((product) => {    
                return res.status(200).json(product)
            });
    
        } catch (error) { 
            if(error instanceof DuplicateEntriesError) {
                return res.status(error.code).json({message: error.message});
            }
            return res.status(400).json(error);
        }
    }

    static show(req, res) {
        const { product_id } = req.params.product_id;
        
        Product.query().findById(product_id)
            .then(product => {
                if(product) {
                    return res.status(200).json(product)
                } else {
                    return res.status(404).json({error: `No se a encontrado el producto con id ${req.params.product_id}`});
                }
            });
    }

    static destroy(req, res) {
        const { product_id } = req.params.product_id;

        Product.query().deleteById(product_id)
            .then(product_id =>{
                if (product_id === 0) {
                    return res.status(404).json({error: `No se a encontrado el producto con id ${req.params.product_id}`});
                }
                return res.status(200).json({ success: `Se borro el producto con ID ${req.params.product_id}`});
            })
    }

    static update(req, res) {
        const { name, price } = req.body;
        const { product_id } = req.params.product_id;

        Product.query()
            .patchAndFetchById(product_id, {
                name: name || undefined,
                price: price || undefined
            }).then(product => {

                if (!product) {
                    return res.status(404).json({error: `No se a encontrado el producto con id ${req.params.product_id}`});
                }
                
                return res.status(200).json(product);
            })
    }
}