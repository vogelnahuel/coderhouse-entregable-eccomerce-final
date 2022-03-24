import { IsNotEmpty, IsString,IsEmail, IsArray } from "class-validator";

/**
 *  UsersBuyRequest
 *  @brief valida los datos del usuario en base a condiciones
 *  
 */
export class UsersBuyRequest {

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone:string;

  @IsNotEmpty()
  @IsString()
  name:string;

  @IsNotEmpty()
  @IsArray()
  productList:[];


  /**
   *
   * @param body email y constraseña nombre edad telefono direccion avatar
   */ 
  constructor(body?: UsersBuyRequest) {
    this.email = body?.email || '';
    this.name = body?.name || '';
    this.phone = body?.phone || '';
    this.productList = body?.productList || [];
  }
  public setbody(body: UsersBuyRequest){
    this.email = body.email;
    this.name = body.name;
    this.phone = body.phone;
    this.productList = body.productList;
    return this;
  }

  
}