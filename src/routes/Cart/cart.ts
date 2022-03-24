
import { Router } from "express";
import { CartController } from "../../controllers/cartControllers";

const routerCart = Router();

routerCart.post("/", CartController.cartCreate);

routerCart.delete("/:id", CartController.cartDelete);

routerCart.get("/:id/productos", CartController.cartGet);

routerCart.post("/:id/productos", CartController.cartAddProduct);

routerCart.delete("/:id/productos/:id_prod", CartController.cartDeleteProduct);

export default routerCart;
