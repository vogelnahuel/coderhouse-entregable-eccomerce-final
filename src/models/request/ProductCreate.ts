import { IsNotEmpty, IsString, IsNumber } from "class-validator";

/**
 *  UsersCreateRequest
 *  @brief valida los datos del usuario en base a condiciones
 *  
 */
export class ProductCreateRequest {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  stock:number;

  @IsNotEmpty()
  @IsString()
  photo:string;

  @IsNotEmpty()
  @IsString()
  code:string;

  @IsNotEmpty()
  @IsString()
  description:string;


  /**
   *
   * @param body 
   */ 

  constructor(body?: ProductCreateRequest) {
    this.name = body?.name || '';
    this.price = body?.price || 0 ;
    this.stock = body?.stock || 0;
    this.photo = body?.photo || '';
    this.code = body?.code || '';
    this.description = body?.description || '';

  }
  
  public setbody(body: ProductCreateRequest){
    this.name = body.name;
    this.price = body.price;
    this.stock = body.stock;
    this.photo = body.photo;
    this.code = body.code;
    this.description = body.description;

    return this;
  }

  
  
}
