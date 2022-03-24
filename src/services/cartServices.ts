/**
 *  LoginService
 *  @brief esta clase hace toda la logica de negocio de los endpoint de users
 *
 */

import { CartDao } from "../dao/cartDao";
import { success } from '../interfaces/usersInterfaces';


export class cartService {
  public static async cartCreateService(data: any): Promise<any> {

    const idParam = data.idUser; 
    let createCarrito = await CartDao.addCarrito(idParam);
    return createCarrito;
  }
  public static async cartDeleteService(data: any): Promise<success> {
    const idParam = data.id
    await CartDao.delete(idParam);
    return {text:"eliminado con exito"};
  }
  public static async cartGetService(data: any): Promise<any> {
    const idParam = data.id
    let getCarrito= await CartDao.getById(idParam);
    return getCarrito;
  }
  public static async cartAddProductService(data: any): Promise<any> {
    await CartDao.addProduct(data.idCart, data.idProduct);
    return {text:"agregado con exito"};
  }
  public static async cartDeleteProductService(data: any): Promise<any> {
    await CartDao.deleteProduct(data.idCart, data.idProduct);
    return {text:"eliminado con exito"};
  }
}
