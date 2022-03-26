/**
 *  LoginService
 *  @brief esta clase hace toda la logica de negocio de los endpoint de users
 *
 */

import { ProductsDao } from "../dao/productDao";

 export class productService {
    public static async productGetService(data: any): Promise<any> {
      let contenidoProductos = await ProductsDao.get(data.id);
      return contenidoProductos;
    }
    public static async productCreateService(data: any): Promise<any> {
      const { name, description, code, price, stock,photo } =data;


      await ProductsDao.add({name,description,code,price,stock,photo});
    }
    public static async productUpdateService(data: any): Promise<any> {
      const timestamp = Date.now();
      await ProductsDao.update(data._id, {
        name: data.name,
        description: data.description,
        code: data.code,
        price: data.price,
        stock: data.stock,
        photo: data.photo,
        timestamp,
      })

      return data;
    }
    public static async productDeleteService(data: any): Promise<any> {
      await ProductsDao.delete(data.id);
    }
    
    
  }
  