import { IsNotEmpty, IsString,IsEmail } from "class-validator";

/**
 *  UsersLoginRequest
 *  @brief valida los datos del usuario en base a condiciones
 *  @param body email y constraseña
 */
export class UsersLoginRequest {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  /**
   *
   * @param body email y constraseña
   */
  constructor(body?: UsersLoginRequest) {
    this.password = body?.password || '';
    this.email = body?.email || '';
  }
  public setbody(body: UsersLoginRequest){
    this.password = body.password;
    this.email = body.email;
    return this;
  }
}
