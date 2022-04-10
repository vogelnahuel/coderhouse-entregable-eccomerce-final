

import { UserService } from "../services/userServices";
import { Request, Response } from "express";
import { HTTP_ERROR_HANDLER } from '../constants/errorHandler';
import { Http } from "../utils/http";

import { LoginPostSucess, success } from "../interfaces/usersInterfaces";

/**
 *  UsersController
 *  @brief Controllador de las pantallas de usuarios
 *
 */
export class UsersController {
  

    /**
   * @brief  controla la ruta de obtencion de usuarios
   * @param req  recibe createUser
   * @returns  un obj  success o un error
   */
  public static async  usersPostCreate  (req: Request, res: Response)  {
    try {

      const response: success = await UserService.usersPostCreateService(req.body);

      Http.Ok(response, res);
    } catch (error) {
   
      HTTP_ERROR_HANDLER({error,res})
    }
  }
  /**
   * @brief  controla la ruta de login de usuarios
   * @param req  recibe loginUser
   * @returns  un obj  LoginPostSucess o un error
   */
  public static async usersPostLogin (req: Request, res: Response) :Promise<any> {
    if (!req.isAuthenticated()) {
      Http.BadRequest("Error en los datos de entrada",res)
    }
    try {
 
      const response: LoginPostSucess = await UserService.usersPostLoginService(req.body);

      Http.Ok(response, res);
    } catch (error) {

      HTTP_ERROR_HANDLER({error,res})
    }
  }
 /**
   * @brief  controla la ruta de login de usuarios
   * @param req  recibe buyUser
   * @returns  un obj  success o un error
   */
  public static async usersPostBuy (req: Request, res: Response)  {

    try {
      const response: success = await UserService.usersPostBuyService(req.body);
      Http.Ok(response, res);
    } catch (error) {
   
      HTTP_ERROR_HANDLER({error,res})
    }
  }
}

