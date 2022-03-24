import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { UsersBuyRequest } from "../models/request/UsersBuy";
import { UsersCreateRequest } from "../models/request/UsersCreate";
import { UsersLoginRequest } from "../models/request/UsersLogin";
import { Http } from "../utils/http";

/**
 * @brief verifica los datos del usuario contenga algun error
 * @params req.body recibe los datos a validar documento y password
 * @returns retorna error o sigue de largo en caso de no tenerlo
 *
 */

export const validatorMiddeware = async <
  T extends UsersCreateRequest | UsersLoginRequest | UsersBuyRequest
>(
  req: Request,
  res: Response,
  next: NextFunction,
  Iclass: T
): Promise<any> => {
  //invoco la validacion de esta clase al hacer un new class
  let body = Iclass.setbody(req.body);

  //verifico los errores que tenga
  const errorRes = await validate(body).then((errors) => {
    if (errors.length > 0) {
      return errors.map((element) => element.constraints);
    }
  });
  //devuelvo un error
  if (errorRes) {
    if (errorRes.length > 1) {
      let vectoresError = [];
      for (let index = 0; index < errorRes.length; index++) {
        vectoresError = vectoresError.concat(Object.values(errorRes[index]));
      }
      Http.BadRequest(vectoresError, res);
    } else {
      Http.BadRequest(Object.values(errorRes[0]), res);
    }
  } else {
    next();
  }
};
