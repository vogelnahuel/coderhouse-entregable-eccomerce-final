import { IsNotEmpty, IsString } from "class-validator";

/**
 *  UsersCreateRequest
 *  @brief valida los datos del usuario en base a condiciones
 *
 */
export class CartAddProductRequest {
  @IsNotEmpty()
  @IsString()
  idCart: string;

  /**
   *
   * @param body
   */

  constructor(body?: CartAddProductRequest) {
    this.idCart = body?.idCart || "";
  }

  public setbody(body: CartAddProductRequest) {
    this.idCart = body.idCart;

    return this;
  }
}
