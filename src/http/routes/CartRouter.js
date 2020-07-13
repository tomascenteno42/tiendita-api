import { Router } from "express";

import { CartController } from "../../core/controllers/CartController";

export const cart = Router();


cart.get("/", CartController.index);

cart.post("/:product_id", CartController.create);

cart.patch("/:product_id", CartController.update);

cart.delete("/:product_id", CartController.destroy);
