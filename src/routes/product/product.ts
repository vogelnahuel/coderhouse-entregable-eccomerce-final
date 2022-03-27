import { Router } from "express";
import { ProductUpdateRequest } from "../../models/request/ProductUpdate";
import { validatorMiddeware } from "../..//middlewares/validatorMiddeware";
import { ProductController } from "../../controllers/productControllers";
import { ProductCreateRequest } from "../../models/request/ProductCreate";
/**
 *  @brief inicializa las rutas con su path por defecto y validatorMiddeware middleware que valida los datos
 */
const routerProduct = Router();

routerProduct.get("/:id?", ProductController.productGet);

routerProduct.put(
  "/:id",
  (req, res, next) =>
    validatorMiddeware<ProductUpdateRequest>(
      req,
      res,
      next,
      new ProductUpdateRequest()
    ),
  ProductController.productUpdate
);

routerProduct.post(
  "/",
  (req, res, next) =>
    validatorMiddeware<ProductCreateRequest>(
      req,
      res,
      next,
      new ProductCreateRequest()
    ),
  ProductController.productCreate
);

routerProduct.delete("/:id", ProductController.productDelete);

export default routerProduct;
