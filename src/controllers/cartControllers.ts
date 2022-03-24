


import { Request, Response } from "express";
import { HTTP_ERROR_HANDLER } from '../constants/errorHandler';
import { Http } from "../utils/http";
import log4js from 'log4js';
import { cartService } from "../services/cartServices";
const loggerFile = log4js.getLogger('archivo')

export class CartController {
 
  constructor(private readonly _cartService = new cartService()) {}

  
  public static async  cartCreate  (req: Request, res: Response)  {
    try {
      
      const response = await cartService.cartCreateService(req.body);

      Http.Ok(response, res);
    } catch (error) {
      loggerFile.warn(error);
      HTTP_ERROR_HANDLER({error,res})
    }
  }

  public static async cartDelete (req: Request, res: Response)  {

    try {
 
      const response = await cartService.cartDeleteService(req.params);
      Http.Ok(response, res);
    } catch (error) {
      loggerFile.warn(error);
      HTTP_ERROR_HANDLER({error,res})
    }
  }


  public static async cartGet (req: Request, res: Response)  {

    try {
      const response = await cartService.cartGetService(req.params);
      Http.Ok(response, res);
    } catch (error) {
      loggerFile.warn(error);
      HTTP_ERROR_HANDLER({error,res})
    }
  }

  public static async cartAddProduct (req: Request, res: Response)  {

    try {
      const response = await cartService.cartAddProductService({idCart:req.body.idCart,idProduct:req.params.id});
      Http.Ok(response, res);
    } catch (error) {
      loggerFile.warn(error);
      HTTP_ERROR_HANDLER({error,res})
    }
  }

  public static async cartDeleteProduct (req: Request, res: Response)  {

    try {
      const idParam = req.params.id;
      const idParamProd = req.params.id_prod;
      const response = await cartService.cartDeleteProductService({idCart:idParam,idProduct:idParamProd});
      Http.Ok(response, res);
    } catch (error) {
      loggerFile.warn(error);
      HTTP_ERROR_HANDLER({error,res})
    }
  }
}

