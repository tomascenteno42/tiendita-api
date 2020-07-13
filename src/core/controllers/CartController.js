import { User } from "@models/User";
import { Product } from "@models/Product";

export class CartController {
    
    static async index(req, res) {
        try {
            const user = await User.query().findById(req.user.id).withGraphFetched("products");
            return res.status(200).json(user.products);
        } catch (error) {
            return res.status(400).json({errors: "Something went wrong fetching your products"});
        }
    }
    
    static async create(req, res) {
        const { product_id } = req.params;
        const { user } = req;
        try {
            const product = await Product.query().findById(product_id);
            await user.$relatedQuery("products").relate({ id: product.id, quantity: 1 });        
    
            return res.status(200).json({ success: "Your product uploaded succesfully" });
        } catch (error) {
    
            return res.status(400).json({errors: error.details});
        }
    }

    static async update(req, res) {
        const { quantity } = req.body;
        const { product_id } = req.params;
        const { user } = req;
        try {
            const product = await Product.query().findById(product_id).skipUndefined();
    
            await user.$relatedQuery("products").patch({quantity}).where("products.id", product.id);
    
            return res.status(200).json({ success: "Your product has been updated" });
    
        } catch (error) {
            console.log(error);
            return res.status(400).json({error});
            
        }
    }

    static async destroy(req, res) {
        const { product_id } = req.params;
        const { user } = req;
       
        try {
            const product = await Product.query().findById(product_id);
    
            await user.$relatedQuery("products").unrelate().where("products.id", product.id);
    
            return res.status(200).json({ success: "Your product has been erased from the galaxy"});
        } catch (error) {
            return res.status(400).json({ error });
        }
    }
}