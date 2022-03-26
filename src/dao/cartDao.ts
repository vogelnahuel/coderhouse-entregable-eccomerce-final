import moment from "moment";
import mongoose from "mongoose";
import { ProductsDao } from "./productDao";

const ObjectId = require("mongodb").ObjectId;

import cartModel from "../models/schemas/cartSchema";
import { NotFound } from "../utils/errorsClass";

export class CartDao {
  static productos: any[];

  static async getByIdUser(IdCarrito: string) {
    const isValid = mongoose.Types.ObjectId.isValid(IdCarrito);
    if (isValid) {
      const getCarrito = await cartModel.findOne({ _idUser: IdCarrito });
      if (!getCarrito) throw new NotFound("El carrito solicitado no existe");
      return getCarrito;
    } else {
      throw new NotFound("El id pasado es invalido");
    }
  }

  static async getById(IdCarrito: string) {
    const isValid = mongoose.Types.ObjectId.isValid(IdCarrito);
    if (isValid) {
      const getCarrito = await cartModel.findById(IdCarrito);
      if (!getCarrito) throw new NotFound("El carrito solicitado no existe");
      return getCarrito;
    } else {
      throw new NotFound("El id pasado es invalido");
    }
  }

  static async addCarrito(idUser: string) {
    const isValid = mongoose.Types.ObjectId.isValid(idUser);
    if (isValid) {
      const newCarrito = {
        _id: new mongoose.Types.ObjectId().toHexString(),
        _idUser: idUser,
        products: [],
        timestamp: `${moment().format("DD MM YYYY hh:mm")}`,
      };
      const addCarrito = await cartModel.create(newCarrito);
      if (!addCarrito) throw new NotFound("error al crear carrito");
      return addCarrito;
    } else {
      throw new NotFound("El id pasado es invalido");
    }
  }

  static async addProduct(idCart: string, idProduct: string) {
    const isValid = mongoose.Types.ObjectId.isValid(idCart);
    const isValidProd = mongoose.Types.ObjectId.isValid(idProduct);
    if (isValid && isValidProd) {
      let productoSeleccionado;
      try {
        productoSeleccionado = await ProductsDao.getById(idProduct);
      } catch (error) {
        throw new NotFound("no existe el producto");
      }
      try {
        const update = await cartModel.updateOne(
          { _id: idCart },
          { $push: { products: productoSeleccionado } }
        );
        if (!update) throw new NotFound("error al agregar producto al carrito");
      } catch (error) {
        throw new NotFound("error al agregar producto al carrito");
      }
    } else {
      throw new NotFound("El id pasado es invalido");
    }
  }

  static async delete(idCart: string) {
    const isValid = mongoose.Types.ObjectId.isValid(idCart);
    if (isValid) {
      const deleted = await cartModel.deleteOne({ _id: idCart });

      if(deleted.deletedCount===0)
      throw new NotFound("no existe el carrito");
    } else {
      throw new NotFound("El id pasado es invalido");
    }
  }

  static async deleteProduct(idUser: string, productId: string) {
    const isValid = mongoose.Types.ObjectId.isValid(idUser);
    const isValidProd = mongoose.Types.ObjectId.isValid(productId);
    if (isValid && isValidProd) {
    
        const msg = await cartModel.updateOne(
          { _id: idUser },
          { $pull: { products: { _id: ObjectId(productId) } } }
        );

        if (msg.modifiedCount === 0) {
          throw new NotFound("El producto solicitado no existe en el carrito");
        }
      
    } else {
      throw new NotFound("El id pasado es invalido");
    }
  }
}
