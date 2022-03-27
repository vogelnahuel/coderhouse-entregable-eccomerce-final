import { User } from "../interfaces/usersInterfaces";
import userModel from "../models/schemas/userSchema";
import { NotFound } from "../utils/errorsClass";
/**
 *  UserDao
 *  @brief hace peticiones a la base de Usuarios
 */
export class UserDao {
  /**
   *  @brief busca por email de usuario 
   *  @param email email de usuario
   *  @returns  User o error
   */
  static async getCarrito(email: string):Promise<User> {
    const getUser:User = await userModel.findOne({ email });

    if (!getUser) throw new NotFound("No se encontro el email");

    return getUser;
  }
}
