import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { ProductUpdateRequest } from "../models/request/ProductUpdate";
import { ProductCreateRequest } from "../models/request/ProductCreate";
import { UsersBuyRequest } from "../models/request/UsersBuy";
import { UsersCreateRequest } from "../models/request/UsersCreate";
import { UsersLoginRequest } from "../models/request/UsersLogin";
import { Http } from "../utils/http";
import { CartCreateRequest } from "../models/request/CartCreate";
import { CartAddProductRequest } from "../models/request/CartAddProduct";

/**
 * @brief verifica los datos pasados contenga algun error
 * @param req.body recibe los datos a validar 
 * @returns retorna error o sigue de largo en caso de no tenerlo
 *
 */

export const validatorMiddeware = async <
  T extends
    | UsersCreateRequest
    | UsersLoginRequest
    | UsersBuyRequest
    | ProductCreateRequest
    | ProductUpdateRequest
    | CartCreateRequest
    | CartAddProductRequest
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
