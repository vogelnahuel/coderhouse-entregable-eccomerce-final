import { IsNotEmpty, IsString } from "class-validator";

/**
 *  CartAddProductRequest
 *  @brief valida los datos del carrito en base a condiciones
 *  @param  body idCart 
 */
export class CartAddProductRequest {
  @IsNotEmpty()
  @IsString()
  idCart: string;

  /**
   *
   * @param  body idCart 
   */

  constructor(body?: CartAddProductRequest) {
    this.idCart = body?.idCart || "";
  }

  public setbody(body: CartAddProductRequest) {
    this.idCart = body.idCart;

    return this;
  }
}
