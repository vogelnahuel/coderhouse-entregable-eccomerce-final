


import { Request, Response } from "express";
import { HTTP_ERROR_HANDLER } from '../constants/errorHandler';
import { Http } from "../utils/http";
import log4js from 'log4js';
import { productService } from "../services/productServices";

const loggerFile = log4js.getLogger('archivo')

export class ProductController {
  constructor(private readonly _cartService = new productService()) {}

  
  public static async  productGet  (req: Request, res: Response)  {
    try {
      
      const response = await productService.productGetService(req.params);

      Http.Ok(response, res);
    } catch (error) {
      loggerFile.warn(error);
      HTTP_ERROR_HANDLER({error,res})
    }
  }

  public static async productCreate (req: Request, res: Response)  {

    try {
     
      const response = await productService.productCreateService(req.body);
      Http.Ok(response, res);
    } catch (error) {
      loggerFile.warn(error);
      HTTP_ERROR_HANDLER({error,res})
    }
  }


  public static async productUpdate (req: Request, res: Response)  {

    try {
      const idParam = req.params.id;
      const { name, description, code, price, stock,photo } = req.body;
      const response = await productService.productUpdateService({idParam,name,description,code,price,stock,photo});
      Http.Ok(response, res);
    } catch (error) {
      loggerFile.warn(error);
      HTTP_ERROR_HANDLER({error,res})
    }
  }

  public static async productDelete (req: Request, res: Response)  {

    try {
      const response = await productService.productDeleteService(req.params);
      Http.Ok(response, res);
    } catch (error) {
      loggerFile.warn(error);
      HTTP_ERROR_HANDLER({error,res})
    }
  }


}

