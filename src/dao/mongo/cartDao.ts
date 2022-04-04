import moment from "moment";
import mongoose from "mongoose";
import {FactoryCreateDao}  from "../FactoryCreate";
const ObjectId = require("mongodb").ObjectId;
import cartModel from "../../models/schemas/cartSchema";
import { NotFound } from "../../utils/errorsClass";
import { CartUser } from "../../interfaces/cartInterfaces";




 let instance:CartDao = null;
 /**
 *  CartDao
 *  @brief hace peticiones a la base de cart
 */
export class CartDao {
    /**
   *  @brief busca por id de usuario a un carrito
   *  @param IdUserCart Id de usuario
   *  @returns  CartUser o error
   */
  async getByIdUser(IdUserCart: string): Promise<CartUser> {
    const isValid: boolean = mongoose.Types.ObjectId.isValid(IdUserCart);
    if (isValid) {
      const getCarrito:CartUser = await cartModel.findOne({ _idUser: IdUserCart });
      if (!getCarrito) throw new NotFound("El carrito solicitado no existe");
      return getCarrito;
    } else {
      throw new NotFound("El id pasado es invalido");
    }
  }
   /**
   *  @brief busca por id de carrito a un carrito
   *  @param IdCarrito IdCarrito
   *  @returns  CartUser o error
   */
   async getById(IdCarrito: string): Promise<CartUser> {
    const isValid: boolean = mongoose.Types.ObjectId.isValid(IdCarrito);
    if (isValid) {
      const getCarrito: CartUser = await cartModel.findById(IdCarrito);
      if (!getCarrito) throw new NotFound("El carrito solicitado no existe");
      return getCarrito;
    } else {
      throw new NotFound("El id pasado es invalido");
    }
  }
   /**
   *  @brief crea un nuevo carrito
   *  @param idUser id de usuario
   *  @returns  CartUser o error
   */
   async addCarrito(idUser: string): Promise<CartUser> {
    const isValid: boolean = mongoose.Types.ObjectId.isValid(idUser);
    if (isValid) {
      const newCarrito = {
        _id: new mongoose.Types.ObjectId().toHexString(),
        _idUser: idUser,
        products: [],
        timestamp: `${moment().format("DD MM YYYY hh:mm")}`,
      };
      const addCarrito: CartUser = await cartModel.create(newCarrito);
      if (!addCarrito) throw new NotFound("error al crear carrito");
      return addCarrito;
    } else {
      throw new NotFound("El id pasado es invalido");
    }
  }

    /**
   *  @brief agrega un  nuevo  producto a  un carrito
   *  @params idCart  idProduct
   */

   async addProduct(idCart: string, idProduct: string) {
   
    const factory:FactoryCreateDao = FactoryCreateDao.getInstance();
    const   {ProductsDao}  = await factory.createInstances()

    const isValid: boolean = mongoose.Types.ObjectId.isValid(idCart);
    const isValidProd: boolean = mongoose.Types.ObjectId.isValid(idProduct);
    if (isValid && isValidProd) {

      let productoSeleccionado = await ProductsDao.getById(idProduct);

      const update = await cartModel.updateOne(
        { _id: idCart },
        { $push: { products: productoSeleccionado } }
      );

      if (update.modifiedCount === 0)
        throw new NotFound("el carrito no existe");
    } else {
      throw new NotFound("El id pasado es invalido");
    }
  }
  /**
   *  @brief elimina un carrito
   *  @param idCart  idCart
   */
   async delete(idCart: string) {
    const isValid: boolean = mongoose.Types.ObjectId.isValid(idCart);
    if (isValid) {
      const deleted = await cartModel.deleteOne({ _id: idCart });

      if (deleted.deletedCount === 0)
        throw new NotFound("no existe el carrito");
    } else {
      throw new NotFound("El id pasado es invalido");
    }
  }
/**
   *  @brief elimina un producto de un  carrito
   *  @params idUser  productId
   */
   async deleteProduct(idUser: string, productId: string) {
    const isValid: boolean = mongoose.Types.ObjectId.isValid(idUser);
    const isValidProd: boolean = mongoose.Types.ObjectId.isValid(productId);
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
  static getInstance(){
    if(!instance){
      instance = new CartDao();
    }
    return instance;
  }
}
