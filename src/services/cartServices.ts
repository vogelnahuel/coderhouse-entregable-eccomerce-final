
import { FactoryCreateDao } from "../dao/FactoryCreate";
import {
  cartProduct,
  CartCreate,
  CartUser,
} from "../interfaces/cartInterfaces";

import { success } from "../interfaces/usersInterfaces";

/**
 *  CartService
 *  @brief esta clase hace toda la logica de negocio de los endpoint de los carritos
 *
 */

export class CartService {

  /**
   *  @brief crea un nuevo carrito
   *  @param data idUser
   *  @returns  CartUser o error
   */

  public static async cartCreateService(data: CartCreate): Promise<CartUser> {
    const factory: FactoryCreateDao = FactoryCreateDao.getInstance();
    const { CartDao } = await factory.createInstances();
    const idParam: string = data.idUser;
    let createCarrito: CartUser = await CartDao.addCarrito(idParam);
    return createCarrito;
  }
  /**
   *  @brief elmina un carrito
   *  @param data params.id carrito
   *  @returns  success o error
   */
  public static async cartDeleteService(data: string): Promise<success> {
    const factory: FactoryCreateDao = FactoryCreateDao.getInstance();
    const { CartDao } = await factory.createInstances();
    await CartDao.delete(data);
    return { text: "eliminado con exito" };
  }
  /**
   *  @brief obtiene un carrito
   *  @param data params.id carrito
   *  @returns  CartUser o error
   */
  public static async cartGetService(data: string): Promise<CartUser> {
    const factory: FactoryCreateDao = FactoryCreateDao.getInstance();
    const { CartDao } = await factory.createInstances();
    let getCarrito: CartUser = await CartDao.getById(data);
    return getCarrito;
  }
  /**
   *  @brief agrega un producto a  un carrito
   *  @param data idCart idProduct
   *  @returns  success o error
   */
  public static async cartAddProductService(
    data: cartProduct
  ): Promise<success> {
    const factory: FactoryCreateDao = FactoryCreateDao.getInstance();
    const { CartDao } = await factory.createInstances();
    await CartDao.addProduct(data.idCart, data.idProduct);
    return { text: "agregado con exito" };
  }
  /**
   *  @brief elmina un producto de un  carrito
   *  @param data idCart idProduct
   *  @returns  success o error
   */
  public static async cartDeleteProductService(
    data: cartProduct
  ): Promise<success> {
    const factory: FactoryCreateDao = FactoryCreateDao.getInstance();
    const { CartDao } = await factory.createInstances();
    await CartDao.deleteProduct(data.idCart, data.idProduct);
    return { text: "eliminado con exito" };
  }
}
