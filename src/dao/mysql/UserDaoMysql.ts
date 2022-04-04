/*CREATE TABLE users (
    _id int not null AUTO_INCREMENT,
    email varchar(100),
    password varchar(100),
    name varchar(100),
    age int,
    address varchar(100),
    phone varchar(50),
    avatar varchar(200),
    PRIMARY KEY (_id)
);*/
/*
INSERT INTO users (email, password, name, age,address,phone,avatar)
VALUES ("vogelnahuel@gmail.com","test1234", "vogelnahuel", 25,"elias bedoya","TEST","imagen.png");
*/
import { User } from '../../interfaces/usersInterfaces';
import userModel from "../../models/schemas/userSchema";
import { NotFound } from "../../utils/errorsClass";
import { UserDto } from "../../models/responseDTO/usersDto";
import { UserDtoLogin } from "../../models/responseDTO/userDtoLogin";
/**
 *  UserDao
 *  @brief hace peticiones a la base de Usuarios
 */
let instance:UserMysql = null;
export class UserMysql {
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

  async create(newUser: User):Promise<User> {
    const getUser:User =  await userModel.create(newUser);

    if (!getUser) throw new NotFound("Error al crear ");

    return getUser;
  }
  //PATRON SINGLETON
  static getInstance(){
    if(!instance){
      instance = new UserMysql();
    }
    return instance;
  }
  
}
