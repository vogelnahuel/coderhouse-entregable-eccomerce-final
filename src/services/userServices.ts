

import { generateToken } from "../utils/token";

import { NotFound } from "../utils/errorsClass";
import { UserDao } from "../dao/usersDao";
import { CartDao } from "../dao/cartDao";
import { createTransport } from "nodemailer";
import { buyUser, createUser, LoginPostSucess, loginUser, success, User, MailOptions } from "../interfaces/usersInterfaces";
import { CartUser } from "../interfaces/cartInterfaces";


 const  smtpTransport = createTransport({
     host: "smtp.gmail.com",
     port: 465,
     secure: true, // use SSL
     auth: {
      user: 'vogelnahuel@gmail.com',
      pass: 'txcyxroqsjnjtqan'
  },
   });


 const accountSID:string="AC300861e461e8a47a5b312131c2bc76c1";
 const authToken:string="538daa933922f55da1d676853c842ac5"; // este token solo dura 3 dias
 const client = require('twilio')(accountSID,authToken);


/**
 *  UserService
 *  @brief esta clase hace toda la logica de negocio de los endpoint de los usuarios
 *
 */
export class UserService {

  /**
   *  @brief envia un email  una vez creado el usuario
   *  @param data createUser
   *  @returns  success o error
   */
  public static async usersPostCreateService(data:createUser): Promise<success> {
 
    const MAIL_OPTIONS:MailOptions = {
      from: "Servidor de node.js",
      to: data.email,
      subject: "Nuevo usuario",
      html: '<h1 style="color:blue;"> '+data.name+data.age+data.address+'  </h1>',
    };
    try {
      await smtpTransport.sendMail(MAIL_OPTIONS);
      return { text: "se creo con exito" };
    } catch (error) {

      throw new NotFound('The MAIL_OPTIONS is invalid');
    }
  }

  /**
   *  @brief verifica si el usuario existe y devuelve el token para logearse
   *  @param data loginUser
   *  @returns  LoginPostSucess o error
   */
  public static async usersPostLoginService(data:loginUser): Promise<LoginPostSucess> {

    let User:User =  await UserDao.getCarrito(data.email);
    let cartUser:CartUser = await CartDao.getByIdUser(User._id);

    const token = generateToken(data.email)
    const carritoUserRes:LoginPostSucess = {
      token,
      cartUser,
      User
    }
    return carritoUserRes

  }

    /**
   *  @brief envia un email y un whatsapp una vez hecha la compra del usuario
   *  @param data buyUser
   *  @returns  success o error
   */
  public static async usersPostBuyService(data:buyUser): Promise<success> {
    const {productList,email,name,phone} = data;

    const MAIL_OPTIONS:MailOptions = {
      from: "Servidor de node.js",
      to: email,
      subject: `nuevo pedido de ${name} ${email}`,
      html: '<h1 style="color:blue;"> '+JSON.stringify(productList)+'  </h1>',
    };

    try {
      await smtpTransport.sendMail(MAIL_OPTIONS);
      
    } catch (error) {
      throw new NotFound('The MAIL_OPTIONS is invalid');
    }

    
    try {
      await client.messages
      .create({
         from: 'whatsapp:+14155238886',
         body: `nuevo pedido de ${name} ${email}`,
         to: `whatsapp:${phone}`
       })
    } catch (error) {
      throw new NotFound('The messages is invalid');
    }
    return { text: "se creo con exito" };
  }
}
