import { User } from '../../interfaces/usersInterfaces';
import userModel from "../../models/schemas/userSchema";
import { NotFound } from "../../utils/errorsClass";
import { UserDto } from "../../models/responseDTO/usersDto";
import { UserDtoLogin } from "../../models/responseDTO/userDtoLogin";
import { Users } from '../mysql/entities/UserEntity';
/**
 *  UserDao
 *  @brief hace peticiones a la base de Usuarios
 */
let instance:UserDao = null;
export class UserDao {
  /**
   *  @brief busca por email de usuario 
   *  @param email email de usuario
   *  @returns  User o error
   */
  async getCarrito(email: string):Promise<UserDto> {
    const getUser:User = await userModel.findOne({ email });

    if (!getUser) throw new NotFound("No se encontro el email");
    const Response: UserDto =  new UserDto(getUser);
    return Response;
  }
  async getUser(email: string):Promise<UserDtoLogin> {
    const getUser:User = await userModel.findOne({ email });

    if (!getUser) 
    return null;

    return getUser;
  }

  async create(newUser: User | Users):Promise<User> {
    const getUser:User =  await userModel.create(newUser);

    if (!getUser) throw new NotFound("Error al crear ");

    return getUser;
  }
  //PATRON SINGLETON
  static getInstance(){
    if(!instance){
      instance = new UserDao();
    }
    return instance;
  }
  
}
