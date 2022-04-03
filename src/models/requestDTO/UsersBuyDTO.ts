import { IsNotEmpty, IsString,IsEmail, IsArray } from "class-validator";

/**
 *  UsersBuyRequest
 *  @brief valida los datos del usuario en base a condiciones
 *  @param body email y phone name productList 
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
   * @param body email y phone name productList 
   */ 
  constructor(body?: UsersBuyRequest) {
    this.email = body?.email || '';
    this.name = body?.name || '';
    this.phone = body?.phone || '';
    this.productList = body?.productList || [];
  }
   /**
   *
   * @param body email y phone name productList 
   */ 
  public setbody(body: UsersBuyRequest){
    this.email = body.email;
    this.name = body.name;
    this.phone = body.phone;
    this.productList = body.productList;
    return this;
  }

  
}