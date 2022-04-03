import { IsNotEmpty, IsString } from "class-validator";

/**
 *  CartCreateRequest
 *  @brief valida los datos del carrito en base a condiciones
 *  @param body idUser
 */
export class CartCreateRequest {
  @IsNotEmpty()
  @IsString()
  idUser: string;

  /**
   *
   * @param body idUser
   */

  constructor(body?: CartCreateRequest) {
    this.idUser = body?.idUser || "";
  }

  public setbody(body: CartCreateRequest) {
    this.idUser = body.idUser;

    return this;
  }
}
