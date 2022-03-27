import express from "express";
import routerUser from "../routes/user/users";
import routerCart from "../routes/cart/cart";
import routerProduct from "../routes/product/product";
import { Request, Response } from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "../constants/swaggerConfig";
import { verifyToken } from "../utils/token";
import cors from "cors";
import passport from 'passport';

import log4js from 'log4js';
const logger = log4js.getLogger()
require('../utils/passport')
/**
 * Server
 * @brief inicializa el servidor
 *
 */
export default class Server {
  private readonly app: any;
  private readonly port: string;
  private readonly productPath: string;
  private readonly cartPath: string;
  private readonly userPath: string;
  /**
   * @brief inicializa las rutas y middlewares
   */

  constructor() {
    this.app = express();

    this.app.use(cors({ origin: "*" }));
    this.app.use(passport.initialize())

    this.port = process.env.PORT || '3000';
    this.productPath = "/api/productos";
    this.cartPath = "/api/carrito";
    this.userPath = "/api/users";

    //Middlewares
    this.middlewares();

    //Rutas de mi app
    this.routes();
  }
  /**
   * @brief inicializa los  middlewares
   *
   */
  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    //parseo y lectura del body de lo que mande el front en cualquier verbo http
    this.app.use(express.json());
    this.app.use(verifyToken)
  }
  /**
   * @brief inicializa los  rutas
   *
   */
  routes() {
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));
    this.app.use(this.userPath,routerUser);
    this.app.use(this.cartPath,routerCart);
    this.app.use(this.productPath,routerProduct);

    //ruta por defecto en caso de no encontrarse
    this.app.all("*", (req:Request, res:Response) => {
      res.status(404).json({
        error: -2,
        descripcion: `ruta ${req.url} y  método  ${req.method} no implementados`,
      });
    });
  }
  /**
   * @brief metodo que inicia  el servidor
   *
   */
  listen() {
    this.app.listen(this.port, () => {
      logger.info("servidor corriendo en puerto:" + this.port);
    });
  }
}

