import mongoose from "mongoose";
import moment from "moment";
import productModel from "../models/schemas/productSchema";
import { NotFound } from "../utils/errorsClass";

export class ProductsDao {
  static async get(idParam: string) {
    if (idParam) {
      const productList = await this.getById(idParam);
      if (!productList)
        throw new NotFound(
          " no existe producto con ese id cargados en tu base de datos"
        );
      return productList;
    } else {
      const productsList = await productModel.find({}).sort({ nombre: 1 });
      if (productsList.length == 0)
        throw new NotFound(
          "Todavia no hay productos cargados en tu base de datos"
        );
      return productsList;
    }
  }

  static async getById(productId) {
    const isValid = mongoose.Types.ObjectId.isValid(productId);
    if (isValid) {
      const getProduct = await productModel.findById(productId);
      if (!getProduct) throw new NotFound(" el producto solicitado no existe");
      return getProduct;
    } else {
      throw new NotFound("El id pasado es invalido");
    }
  }

  static async add(data) {
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

  static async delete(productId) {
    const isValid = mongoose.Types.ObjectId.isValid(productId);
    if (isValid) {
      const result = await productModel.findOneAndDelete({ _id: productId });
      if (!result) throw new NotFound(" el producto solicitado no existe");
    } else {
      throw new NotFound("El id pasado es invalido");
    }
  }

  static async update(productId: string, newData) {
    const isValid = mongoose.Types.ObjectId.isValid(productId);
    if (isValid) {
      newData._id = productId;
      const update = await productModel.findOneAndUpdate(
        { _id: productId },
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
