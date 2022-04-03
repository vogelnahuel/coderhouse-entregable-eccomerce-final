import { Router } from "express";
import { validatorMiddeware } from "../../middlewares/validatorMiddeware";
import { CartController } from "../../controllers/cartControllers";
import { CartCreateRequest } from '../../models/requestDTO/CartCreateDTO';
import { CartAddProductRequest } from '../../models/requestDTO/CartAddProductDTO';

/**
 *  @brief inicializa las rutas con su path por defecto y validatorMiddeware middleware que valida los datos
 */
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
