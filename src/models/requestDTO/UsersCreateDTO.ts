import { IsNotEmpty, IsString,IsEmail, IsNumber } from "class-validator";

/**
 *  UsersCreateRequest
 *  @brief valida los datos del usuario en base a condiciones
 *  @param body email y constraseña nombre edad telefono direccion avatar
 */
export class UsersCreateRequest {

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name:string;

  @IsNotEmpty()
  @IsNumber()
  age:number;

  @IsNotEmpty()
  @IsString()
  address:string;

  @IsNotEmpty()
  @IsString()
  phone:string;

  @IsNotEmpty()
  @IsString()
  avatar:string;

  /**
   *
   * @param body email y constraseña nombre edad telefono direccion avatar
   */ 

  constructor(body?: UsersCreateRequest) {
    this.password = body?.password || '';
    this.email = body?.email || '' ;
    this.name = body?.name || '';
    this.age = body?.age || 0;
    this.address = body?.address || '';
    this.phone = body?.phone || '';
    this.avatar = body?.avatar || '';
  }
  
  public setbody(body: UsersCreateRequest){
    this.password = body.password;
    this.email = body.email;
    this.name = body.name;
    this.age = body.age;
    this.address = body.address;
    this.phone = body.phone;
    this.avatar = body.avatar;
    return this;
  }

  
  
}
