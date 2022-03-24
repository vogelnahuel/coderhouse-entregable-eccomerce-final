
import { Router } from "express";
import { ProductController } from "../../controllers/productControllers";


const routerProduct = Router();


routerProduct.get("/:id?", ProductController.productGet);

routerProduct.put("/:id", ProductController.productUpdate);

routerProduct.post("/", ProductController.productCreate);

routerProduct.delete("/:id", ProductController.productDelete);

export default routerProduct;
