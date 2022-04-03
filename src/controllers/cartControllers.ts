import { Request, Response } from "express";
import { HTTP_ERROR_HANDLER } from "../constants/errorHandler";
import { Http } from "../utils/http";
import log4js from "log4js";
import { CartService } from "../services/cartServices";
import { CartUser } from "../interfaces/cartInterfaces";
import { success } from "../interfaces/usersInterfaces";
const loggerFile = log4js.getLogger("archivo");

/**
 *  CartController
 *  @brief Controllador de las pantallas de carrito
 *
 */
export class CartController {

  /**
   * @brief  controla la ruta de creacion de carritos
   * @param req  recibe en el body CartCreate
   * @returns  un obj  CartUser o un error
   */
  public static async cartCreate(req: Request, res: Response) {
    try {
      const response: CartUser = await CartService.cartCreateService(req.body);

      Http.Ok(response, res);
    } catch (error) {
      loggerFile.warn(error);
      HTTP_ERROR_HANDLER({ error, res });
    }
  }
  /**
   * @brief  controla la ruta de eliminacion de carritos
   * @param req  recibe en el params id
   * @returns  un obj  success o un error
   */
  public static async cartDelete(req: Request, res: Response) {
    try {
      const response: success = await CartService.cartDeleteService(
        req.params.id
      );
      Http.Ok(response, res);
    } catch (error) {
      loggerFile.warn(error);
      HTTP_ERROR_HANDLER({ error, res });
    }
  }
 /**
   * @brief  controla la ruta de obtencion de carritos
   * @param req  recibe en el params id
   * @returns  un obj  CartUser o un error
   */
  public static async cartGet(req: Request, res: Response) {
    try {
      const response: CartUser = await CartService.cartGetService(
        req.params.id
      );
      Http.Ok(response, res);
    } catch (error) {
      loggerFile.warn(error);
      HTTP_ERROR_HANDLER({ error, res });
    }
  }
 /**
   * @brief  controla la ruta de obtencion de carritos
   * @param req  recibe en el body idCart y params idProduct
   * @returns  un obj  success o un error
   */
  public static async cartAddProduct(req: Request, res: Response) {
    try {
      const response: success = await CartService.cartAddProductService({
        idCart: req.body.idCart,
        idProduct: req.params.id,
      });
      Http.Ok(response, res);
    } catch (error) {
      loggerFile.warn(error);
      HTTP_ERROR_HANDLER({ error, res });
    }
  }
   /**
   * @brief  controla la ruta de obtencion de carritos
   * @param req  recibe en el  params idProduct idCart
   * @returns  un obj  success o un error
   */

  public static async cartDeleteProduct(req: Request, res: Response) {
    try {
      const idParam: string = req.params.id;
      const idParamProd: string = req.params.id_prod;
      const response: success = await CartService.cartDeleteProductService({
        idCart: idParam,
        idProduct: idParamProd,
      });
      Http.Ok(response, res);
    } catch (error) {
      loggerFile.warn(error);
      HTTP_ERROR_HANDLER({ error, res });
    }
  }
}
