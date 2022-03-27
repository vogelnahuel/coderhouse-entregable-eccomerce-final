import { Request, Response } from "express";
import { HTTP_ERROR_HANDLER } from "../constants/errorHandler";
import { Http } from "../utils/http";
import log4js from "log4js";
import { ProductService } from "../services/productServices";
import {
  Products,
  ProductUpdateRequest,
} from "../interfaces/productInterfaces";
import { success } from "../interfaces/usersInterfaces";

const loggerFile = log4js.getLogger("archivo");

/**
 *  ProductController
 *  @brief Controllador de las pantallas de productos
 *
 */
export class ProductController {
  constructor(private readonly _cartService = new ProductService()) {}
  /**
   * @brief  controla la ruta de obtencion de productos
   * @param req  recibe en el params id o null
   * @returns  un obj  Products | Products[] o un error
   */
  public static async productGet(req: Request, res: Response) {
    try {
      const response: Products | Products[] =
        await ProductService.productGetService(req.params.id);

      Http.Ok(response, res);
    } catch (error) {
      loggerFile.warn(error);
      HTTP_ERROR_HANDLER({ error, res });
    }
  }
 /**
   * @brief  controla la ruta de creacion de productos
   * @param req  recibe en el body ProductRequest
   * @returns  un obj  success o un error
   */
  public static async productCreate(req: Request, res: Response) {
    try {
      const response: success = await ProductService.productCreateService(
        req.body
      );
      Http.Ok(response, res);
    } catch (error) {
      loggerFile.warn(error);
      HTTP_ERROR_HANDLER({ error, res });
    }
  }

   /**
   * @brief  controla la ruta de actualizacion de productos
   * @param req  recibe en el body ProductUpdateRequest
   * @returns  un obj  ProductUpdateRequest o un error
   */

  public static async productUpdate(req: Request, res: Response) {
    try {
      const _id: string = req.params.id;
      const { name, description, code, price, stock, photo } = req.body;
      const response: ProductUpdateRequest =
        await ProductService.productUpdateService({
          _id,
          name,
          description,
          code,
          price,
          stock,
          photo,
        });
      Http.Ok(response, res);
    } catch (error) {
      loggerFile.warn(error);
      HTTP_ERROR_HANDLER({ error, res });
    }
  }
 /**
   * @brief  controla la ruta de creacion de productos
   * @param req  recibe en el params id de producto
   * @returns  un obj  success o un error
   */
  public static async productDelete(req: Request, res: Response) {
    try {
      const response: success = await ProductService.productDeleteService(
        req.params.id
      );
      Http.Ok(response, res);
    } catch (error) {
      loggerFile.warn(error);
      HTTP_ERROR_HANDLER({ error, res });
    }
  }
}
