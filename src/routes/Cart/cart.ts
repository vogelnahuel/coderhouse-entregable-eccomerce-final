import { Router } from "express";
import { validatorMiddeware } from "../../middlewares/validatorMiddeware";
import { CartController } from "../../controllers/cartControllers";
import { CartCreateRequest } from '../../models/request/CartCreate';
import { CartAddProductRequest } from '../../models/request/CartAddProduct';

const routerCart = Router();

routerCart.post(
  "/",
  (req, res, next) =>
    validatorMiddeware<CartCreateRequest>(
      req,
      res,
      next,
      new CartCreateRequest()
    ),
  CartController.cartCreate
);

routerCart.delete("/:id", CartController.cartDelete);

routerCart.get("/:id/productos", CartController.cartGet);

routerCart.post(
  "/:id/productos",
  (req, res, next) =>
    validatorMiddeware<CartAddProductRequest>(
      req,
      res,
      next,
      new CartAddProductRequest()
    ),
  CartController.cartAddProduct
);

routerCart.delete("/:id/productos/:id_prod", CartController.cartDeleteProduct);

export default routerCart;
