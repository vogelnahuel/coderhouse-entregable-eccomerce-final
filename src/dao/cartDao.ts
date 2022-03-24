import moment from "moment";
import mongoose from "mongoose";
import { ProductsDao } from "./productDao";

const ObjectId = require("mongodb").ObjectId;

import cartModel from "../models/schemas/cartSchema";
import { NotFound } from "../utils/errorsClass";

export class CartDao {
  static productos: any[];

  static async getByIdUser(IdCarrito: string) {
    const getCarrito = await cartModel.findOne({_idUser:IdCarrito});
    if (!getCarrito) throw new NotFound("El carrito solicitado no existe");
    return getCarrito;
  }
  

  static async getById(IdCarrito: string) {
    const getCarrito = await cartModel.findById(IdCarrito);
    if (!getCarrito) throw new NotFound("El carrito solicitado no existe");
    return getCarrito;
  }
  
  static async addCarrito(idUser: string) {
    const newCarrito = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      _idUser: idUser,
      products: [],
      timestamp: `${moment().format("DD MM YYYY hh:mm")}`,
    };
    const addCarrito = await cartModel.create(newCarrito);
    if (!addCarrito) throw new NotFound("error al crear carrito");
    return addCarrito;
  }

  static async addProduct(idCart: string, idProduct: string) {
    
    let productoSeleccionado
    try {
       productoSeleccionado = await ProductsDao.getById(idProduct);
       console.log(productoSeleccionado)
    } catch (error) {
      throw new NotFound("no existe el carrito");
    }
    try {
     
      const update = await cartModel.updateOne(
        { "_id": idCart },
        { $push: { products: productoSeleccionado } }
      );
      if(!update)
      throw new NotFound("error al agregar producto al carrito");
    } catch (error) {
      throw new NotFound("error al agregar producto al carrito");
    }
  }

  static async delete(idCart: string) {


    try {
      await cartModel.deleteOne({ _id: idCart });
    } catch (error) {
      throw new NotFound("error al eliminar carrito");
    }
  }

  static async deleteProduct(idUser: string, productId: string) {
    try {
      const msg = await cartModel.updateOne(
        { _id: idUser },
        { $pull: { products: { _id: ObjectId(productId) } } }
      );

      if (msg.modifiedCount === 0) {
        throw new NotFound("El producto solicitado no existe en el carrito");

      }
    } catch (error) {
      throw new NotFound("error al eliminar el producto del carrito");
    }
  }
}
