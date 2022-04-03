import { IsString, IsNumber } from "class-validator";

/**
 *  ProductUpdateRequest
 *  @brief valida los datos del producto en base a condiciones
 *  @param body name price stock photo code description
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
   * @param body name price stock photo code description
   */ 

  constructor(body?: ProductUpdateRequest) {

 
    this.name = body?.name;
    this.price = body?.price;
    this.stock = body?.stock;
    this.photo = body?.photo;
    this.code = body?.code;
    this.description = body?.description;

  }
  
  /**
   *
   * @param body name price stock photo code description
   */ 
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
