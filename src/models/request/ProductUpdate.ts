import { IsNotEmpty, IsString, IsNumber } from "class-validator";

/**
 *  UsersCreateRequest
 *  @brief valida los datos del usuario en base a condiciones
 *  
 */
export class ProductUpdateRequest {

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock:number;

  @IsString()
  photo:string;

  @IsString()
  code:string;

  @IsString()
  description:string;


  /**
   *
   * @param body 
   */ 

  constructor(body?: ProductUpdateRequest) {

 
    this.name = body?.name;
    this.price = body?.price;
    this.stock = body?.stock;
    this.photo = body?.photo;
    this.code = body?.code;
    this.description = body?.description;

  }
  
  public setbody(body: ProductUpdateRequest){
    
    this.name = body?.name || '';
    this.price = body?.price || 0;
    this.stock = body?.stock || 0;
    this.photo = body?.photo || '';
    this.code = body?.code || '';
    this.description = body?.description || '';

    return this;
  }

  
  
}
