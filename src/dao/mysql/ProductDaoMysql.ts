/**CREATE TABLE products (
    _id int not null AUTO_INCREMENT,
    name varchar(50),
    price int,
    stock int,
    photo varchar(200),
    code varchar(10),
    description varchar(200),
    timestamp varchar(50),
    PRIMARY KEY (_id)
); */
/*
INSERT INTO products (name, price, stock, photo,code,description,timestamp)
VALUES ("Milanesas de pollo",1000, 15, "mila.png","AAA111","milanesa","03 04 2022 19 15");
*/

import mongoose from "mongoose";
import moment from "moment";
import productModel from "../../models/schemas/productSchema";
import { NotFound } from "../../utils/errorsClass";
import {
  ProductRequest,
  Products,
  ProductUpdateRequest,
} from "../../interfaces/productInterfaces";
import { products } from "./entities/ProductEntity";
import { AppDataSource } from "../../app";
import { Repository } from "typeorm";

let instance: ProductMysql = null;
/**
 *  ProductsDao
 *  @brief hace peticiones a la base de Products
 */
export class ProductMysql {
  productRepository: Repository<products>;

  constructor() {
    this.productRepository = AppDataSource.getRepository(products);
  }
  /**
   *  @brief busca por id de producto a un producto
   *  @param idParam Id de producto
   *  @returns  Products | Products[] o error
   */
  async get(idParam?: string): Promise<Products | Products[]> {
    if (idParam) {
      const cast = parseInt(idParam);
      const productList: Products = await this.productRepository
        .createQueryBuilder("products")
        .where("products._id = :_id", { _id: cast })
        .getOne();
      if (!productList)
        throw new NotFound(
          " no existe producto con ese id cargados en tu base de datos"
        );
      return productList;
    } else {
      const productsList: Products[] = await this.productRepository
        .createQueryBuilder("products")
        .getMany();
      if (productsList.length == 0)
        throw new NotFound(
          "Todavia no hay productos cargados en tu base de datos"
        );
      return productsList;
    }
  }
  /**
   *  @brief busca por id de producto a un producto
   *  @param productId Id de producto
   *  @returns  Products o error
   */
  async getById(productId: string) {
    if (productId) {
      const cast = parseInt(productId);
      const productList: Products = await this.productRepository
        .createQueryBuilder("products")
        .where("products._id = :_id", { _id: cast })
        .getOne();
      if (!productList)
        throw new NotFound(
          " no existe producto con ese id cargados en tu base de datos"
        );
      return productList;
    }
  }
  /**
   *  @brief crea un producto
   *  @param data ProductRequest
   *  @returns  Products o error
   */
  async add(data: ProductRequest) {
    const newProduct = new products();
    newProduct.name = data.name;
    newProduct.price = data.price;
    newProduct.stock = data.stock;
    newProduct.photo = data.photo;
    newProduct.code = data.code;
    newProduct.description = data.description;
    newProduct.timestamp = `${moment().format("DD MM YYYY hh:mm")}`;
    const addProduct = await this.productRepository
      .createQueryBuilder()
      .insert()
      .into("products")
      .values(newProduct)
      .execute();
    if (!addProduct) throw new NotFound("Error al crear el producto");

    return addProduct;
  }

  /**
   *  @brief elimina un producto haciendo la peticion a la base
   *  @param productId string
   */
  async delete(productId: string) {
    const cast = parseInt(productId);
    const productList = await this.productRepository
      .createQueryBuilder()
      .delete()
      .from("products")
      .where("products._id = :_id", { _id: cast })
      .execute();

    if (productList.affected === 0)
      throw new NotFound(" el producto solicitado no existe");
  }
  /**
   *  @brief actualiza un producto haciendo la peticion a la base
   *  @param newData ProductUpdateRequest
   */
  async update(newData: ProductUpdateRequest) {

    //elimina propiedades en null
    let o = Object.fromEntries(Object.entries(newData).filter(([_, v]) => v != null));
 


    const cast = parseInt(newData._id);
    const update = await this.productRepository
      .createQueryBuilder()
      .update("products")
      .set(o )
      .where("products._id = :_id", { _id: cast })
      .execute();
    if (update.affected === 0)
      throw new NotFound(" el producto solicitado no existe");
    return update;
  }
  static getInstance() {
    if (!instance) {
      instance = new ProductMysql();
    }
    return instance;
  }
}
