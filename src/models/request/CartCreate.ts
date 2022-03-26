import { IsNotEmpty, IsString } from "class-validator";

/**
 *  UsersCreateRequest
 *  @brief valida los datos del usuario en base a condiciones
 *
 */
export class CartCreateRequest {
  @IsNotEmpty()
  @IsString()
  idUser: string;

  /**
   *
   * @param body
   */

  constructor(body?: CartCreateRequest) {
    this.idUser = body?.idUser || "";
  }

  public setbody(body: CartCreateRequest) {
    this.idUser = body.idUser;

    return this;
  }
}
