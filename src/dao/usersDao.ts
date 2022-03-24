import userModel from "../models/schemas/userSchema";
import { NotFound } from "../utils/errorsClass";

export class UserDao {

  static async getCarrito(email: string) {
    const getUser = await userModel.findOne({ email });

    if (!getUser) throw new NotFound("No se encontro el email");

    return getUser;
  }
}
