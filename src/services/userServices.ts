

import { generateToken } from "../utils/token";

import { NotFound } from "../utils/errorsClass";
import { UserDao } from "../dao/usersDao";
import { CartDao } from "../dao/cartDao";
import { createTransport } from "nodemailer";
import { buyUser, createUser, LoginPostSucess, loginUser, success, User } from "../interfaces/usersInterfaces";
/**
 *  LoginService
 *  @brief esta clase hace toda la logica de negocio de los endpoint de users
 *
 */

 const  smtpTransport = createTransport({
     host: "smtp.gmail.com",
     port: 465,
     secure: true, // use SSL
     auth: {
      user: 'vogelnahuel@gmail.com',
      pass: 'txcyxroqsjnjtqan'
  },
   });


 const accountSID="AC300861e461e8a47a5b312131c2bc76c1";
 const authToken="8df8f10d263cd3bcea9c4c42c06bb065";
 const client = require('twilio')(accountSID,authToken);


export class UserService {


  public static async usersPostCreateService(data:createUser): Promise<any> {
 
    const MAIL_OPTIONS = {
      from: "Servidor de node.js",
      to: data.email,
      subject: "Nuevo usuario",
      html: '<h1 style="color:blue;"> '+data.name+data.age+data.address+'  </h1>',
    };
    try {
      await smtpTransport.sendMail(MAIL_OPTIONS);

    } catch (error) {

      throw new NotFound('The MAIL_OPTIONS is invalid');
    }
  }
  public static async usersPostLoginService(data:loginUser): Promise<LoginPostSucess> {

    let resUser:User =  await UserDao.getCarrito(data.email);
    let carritoUser = await CartDao.getByIdUser(resUser._id);

    const token = generateToken(data.email)
    const carritoUserRes = {
      token,
      carritoUser,
      resUser
    }
    return carritoUserRes

  }
  public static async usersPostBuyService(data:buyUser): Promise<success> {
    const {productList,email,name,phone} = data;

    const MAIL_OPTIONS = {
      from: "Servidor de node.js",
      to: email,
      subject: `nuevo pedido de ${name} ${email}`,
      html: '<h1 style="color:blue;"> '+JSON.stringify(productList)+'  </h1>',
    };

    try {
      await smtpTransport.sendMail(MAIL_OPTIONS);
    } catch (error) {
      console.log(error)
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
      console.log(error)
      throw new NotFound('The messages is invalid');
    }
    return { text: "se creo con exito" };
  }
}
