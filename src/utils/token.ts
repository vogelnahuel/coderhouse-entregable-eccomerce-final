import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Http } from "./http";

/**
 *
 *  @brief genera un token aplicando las reglas que se requieran
 *  @param email email
 *  @returns  un JWT encriptado
 */
export const generateToken = (email: string): string => {
  const token: string = jwt.sign({ data: email }, process.env.PRIVATE_KEY, {
    expiresIn: process.env.EXPIRATION_TOKEN,
  });

  return token;
};

/**
 *
 *  @brief verifica el jwt pasado en el header
 *  @returns  un http error o sigue de largo
 */
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!URLS_WITHOUT_TOKEN_SESSION[req.url]) {
    if (!req.url.includes("/api-docs/")) {
      if (!req.url.includes("/socket.io")) {
        const authHeader: string = req?.headers?.token as string;

        if (!authHeader) {
          console.log(req.url);
          return Http.Unauthorized("Invalid authorization", res);
        }
        jwt.verify(authHeader, process.env.PRIVATE_KEY, (err) => {
          if (err) {
            return Http.Unauthorized("Invalid authorization", res);
          }
        });
      }
    }
  }

  next();
};

const URLS_WITHOUT_TOKEN_SESSION = {
  "/users/login": String,
  "/api/users/login": String,
  "/api/users/create": String,
};
