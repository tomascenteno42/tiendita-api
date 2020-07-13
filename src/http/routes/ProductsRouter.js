import { Router } from "express"

import { ProductController } from "../../core/controllers/ProductController";

export const products = Router();


products.get("/", ProductController.index);

products.post("/", ProductController.create );

products.get("/:product_id", ProductController.show);

products.delete("/:product_id", ProductController.destroy);

products.patch("/:product_id", ProductController.update);
