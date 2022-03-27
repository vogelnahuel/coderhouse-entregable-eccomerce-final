import { Router } from "express";
import { validatorMiddeware } from "../../middlewares/validatorMiddeware";
import { UsersController } from "../../controllers/usersControllers";
import { UsersCreateRequest } from "../../models/request/UsersCreate";
import { UsersLoginRequest } from '../../models/request/UsersLogin';
import { UsersBuyRequest } from '../../models/request/UsersBuy';
import passport from "passport";
/**
 *  @brief inicializa las rutas con su path por defecto y validatorMiddeware middleware que valida los datos
 */
const routerUsers = Router();


/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: create User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       500:
 *         description: Some server error
 */
routerUsers.post(
  "/create",
  (req, res, next) =>
    validatorMiddeware<UsersCreateRequest>(req, res, next, new UsersCreateRequest())
    ,passport.authenticate("signup"),
    
  UsersController.usersPostCreate
);


routerUsers.post(
  "/login",
  (req, res, next) =>
    validatorMiddeware<UsersLoginRequest>(req, res, next, new UsersLoginRequest())
    ,passport.authenticate("login"),
  UsersController.usersPostLogin
);



routerUsers.post(
  "/buy",
  (req, res, next) =>
    validatorMiddeware<UsersBuyRequest>(req, res, next, new UsersBuyRequest()),
  UsersController.usersPostBuy
);

export default routerUsers;
