import mongoose from "mongoose";
import moment from "moment";
import productModel from "../models/schemas/productSchema";
import { NotFound } from "../utils/errorsClass";
import {
  ProductRequest,
  Products,
  ProductUpdateRequest,
} from "../interfaces/productInterfaces";
/**
 *  ProductsDao
 *  @brief hace peticiones a la base de Products
 */
export class ProductsDao {
    /**
   *  @brief busca por id de producto a un producto
   *  @param idParam Id de producto
   *  @returns  Products | Products[] o error
   */
  static async get(idParam?: string):Promise<Products | Products[]> {
    if (idParam) {
      const productList: Products = await this.getById(idParam);
      if (!productList)
        throw new NotFound(
          " no existe producto con ese id cargados en tu base de datos"
        );
      return productList;
    } else {
      const productsList: Products[] = await productModel
        .find({})
        .sort({ nombre: 1 });
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
  static async getById(productId: string) {
    const isValid = mongoose.Types.ObjectId.isValid(productId);
    if (isValid) {
      const getProduct = await productModel.findById(productId);
      if (!getProduct) throw new NotFound(" el producto solicitado no existe");
      return getProduct;
    } else {
      throw new NotFound("El id pasado es invalido");
    }
  }
/**
   *  @brief crea un producto
   *  @param data ProductRequest
   *  @returns  Products o error
   */
  static async add(data: ProductRequest) {
    const newProduct = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      name: data.name,
      description: data.description,
      code: data.code,
      photo: data.photo,
      price: data.price,
      stock: data.stock,
      timestamp: `${moment().format("DD MM YYYY hh:mm")}`,
    };

    const addProduct = await productModel.create(newProduct);
    if (!addProduct) throw new NotFound("Error al crear el producto");

    return addProduct;
  }

  /**
   *  @brief elimina un producto haciendo la peticion a la base
   *  @param productId string
   */
  static async delete(productId:string) {
    const isValid = mongoose.Types.ObjectId.isValid(productId);
    if (isValid) {
      const result = await productModel.findOneAndDelete({ _id: productId });
      if (!result) throw new NotFound(" el producto solicitado no existe");
    } else {
      throw new NotFound("El id pasado es invalido");
    }
  }
  /**
   *  @brief actualiza un producto haciendo la peticion a la base
   *  @param newData ProductUpdateRequest
   */
  static async update(newData: ProductUpdateRequest) {
    const isValid = mongoose.Types.ObjectId.isValid(newData._id);
    if (isValid) {
      const update = await productModel.findOneAndUpdate(
        { _id: newData._id },
        newData,
        { new: true }
      );
      if (!update) throw new NotFound(" el producto solicitado no existe");
      return update;
    } else {
      throw new NotFound("El id pasado es invalido");
    }
  }
}
