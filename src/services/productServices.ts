
import {
  ProductRequest,
  Products,
  ProductUpdateRequest,
} from "../interfaces/productInterfaces";
import { ProductsDao } from "../dao/productDao";
import { success } from "../interfaces/usersInterfaces";
import moment from "moment";

/**
 *  ProductService
 *  @brief esta clase hace toda la logica de negocio de los endpoint de los carritos
 *
 */
export class ProductService {
    /**
   *  @brief obtiene un  producto o un Productos[]
   *  @param data id de producto
   *  @returns  Products | Products[] o error
   */
  public static async productGetService(
    data?: string
  ): Promise<Products | Products[]> {
    let contenidoProductos: Products | Products[] = await ProductsDao.get(data);
    return contenidoProductos;
  }
    /**
   *  @brief crea un producto
   *  @param data ProductRequest
   *  @returns  success o error
   */
  public static async productCreateService(
    data: ProductRequest
  ): Promise<success> {
    const { name, description, code, price, stock, photo } = data;

    await ProductsDao.add({ name, description, code, price, stock, photo });
    return { text: "se creo con exito" };
  }
   /**
   *  @brief actualiza un producto
   *  @param data ProductUpdateRequest
   *  @returns  ProductUpdateRequest o error
   */
  public static async productUpdateService(
    data: ProductUpdateRequest
  ): Promise<ProductUpdateRequest> {
    const timestamp: string = `${moment().format("DD MM YYYY hh:mm")}`;
    await ProductsDao.update({
      _id: data._id,
      name: data.name,
      description: data.description,
      code: data.code,
      price: data.price,
      stock: data.stock,
      photo: data.photo,
      timestamp,
    });

    return data;
  }
   /**
   *  @brief elimina un producto
   *  @param data id producto
   *  @returns  success o error
   */
  public static async productDeleteService(data: string): Promise<success> {
    await ProductsDao.delete(data);
    return { text: "se elimino con exito" };
  }
}
