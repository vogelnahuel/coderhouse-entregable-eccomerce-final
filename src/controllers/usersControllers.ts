

import { UserService } from "../services/userServices";
import { Request, Response } from "express";
import { HTTP_ERROR_HANDLER } from '../constants/errorHandler';
import { Http } from "../utils/http";
import log4js from 'log4js';
const loggerFile = log4js.getLogger('archivo')

export class UsersController {
  constructor(private readonly _loginService = new UserService()) {}

  
  public static async  usersPostCreate  (req: Request, res: Response)  {
    try {
      
      const response = await UserService.usersPostCreateService(req.body);

      Http.Ok(response, res);
    } catch (error) {
      loggerFile.warn(error);
      HTTP_ERROR_HANDLER({error,res})
    }
  }

  public static async usersPostLogin (req: Request, res: Response)  {
    if (!req.isAuthenticated()) {
      Http.BadRequest("Error en los datos de entrada",res)
    }
    try {
 
      const response = await UserService.usersPostLoginService(req.body);
      Http.Ok(response, res);
    } catch (error) {
      loggerFile.warn(error);
      HTTP_ERROR_HANDLER({error,res})
    }
  }


  public static async usersPostBuy (req: Request, res: Response)  {

    try {
      const response = await UserService.usersPostBuyService(req.body);
      Http.Ok(response, res);
    } catch (error) {
      loggerFile.warn(error);
      HTTP_ERROR_HANDLER({error,res})
    }
  }
}

