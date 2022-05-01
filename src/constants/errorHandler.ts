import { Http } from "../utils/http";
// import Log4js from 'Log4js'
// const   = Log4js.getLogger("archivo")

type EnumDictionary<T extends string | symbol | number, U> = {
  [K in T]: U;
};

enum ERROR {
  NotFound = "NotFound",
  InvalidParams = "InvalidParams",
  BusinessError = "BusinessError",
  CastError = "CastError",
}


/**
 *
 *  @brief funcion que ejecuta el error correspondiente
 *  @params error y respuesta
 *
 */
export const HTTP_ERROR_HANDLER = ({ error, res }): void => {
  // logger.warn(error);
  const ERROR_SELECTOR: EnumDictionary<ERROR, Function> = {
    [ERROR.NotFound]: () => Http.BadRequest(error.message, res),
    [ERROR.InvalidParams]: () => Http.BadRequest(error.message, res),
    [ERROR.BusinessError]: () => Http.BadRequest(error.message, res),
    [ERROR.CastError]: () => Http.BadRequest(error.message, res),
  };

  if (ERROR_SELECTOR[error.constructor.name]) {
    ERROR_SELECTOR[error.constructor.name]();
  } else {
    Http.InternalServerError(error, res);
  }
};
