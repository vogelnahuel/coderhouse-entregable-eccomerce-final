/*CREATE TABLE carts (
  _id int not null AUTO_INCREMENT PRIMARY KEY,
  _idUser int not null,
  FOREIGN KEY (_idUser) REFERENCES users(_id),
  timestamp varchar(50)
);
CREATE TABLE cartproducts (
  _id int not null AUTO_INCREMENT PRIMARY KEY,
  _idCart int not null,
  _idProduct int NOT null,
  name varchar(50),
  price int,
  stock int,
  photo varchar(200),
  code varchar(10),
  description varchar(200),
  timestamp varchar(50),
  FOREIGN KEY (_idCart) REFERENCES carts(_id),
  FOREIGN KEY (_idProduct) REFERENCES products(_id)
);*/
import moment from "moment";
import mongoose from "mongoose";
import { FactoryCreateDao } from "../FactoryCreate";
const ObjectId = require("mongodb").ObjectId;
import cartModel from "../../models/schemas/cartSchema";
import { NotFound } from "../../utils/errorsClass";
import { CartUser } from "../../interfaces/cartInterfaces";
import { AppDataSource } from "../../app";
import { Carts } from "./entities/CartEntity";
import { CartProducts } from "./entities/CartProductEntity";
import { Repository } from "typeorm";

let instance: CartMysql = null;
/**
 *  CartDao
 *  @brief hace peticiones a la base de cart
 */
export class CartMysql {
  /**
   *  @brief busca por id de usuario a un carrito
   *  @param IdUserCart Id de usuario
   *  @returns  CartUser o error
   */
  cartRepository: Repository<Carts>;
  cartProductRepository;
  constructor() {
    this.cartRepository = AppDataSource.getRepository(Carts);
    this.cartProductRepository = AppDataSource.getRepository(CartProducts);
  }

  async getByIdUser(user_id: string): Promise<any> {
    const getCarrito = await this.cartRepository
      .createQueryBuilder("carts")
      .where("carts.idUser_id = :user_id", { user_id: user_id })
      .getOne();
    if (!getCarrito) throw new NotFound("El carrito solicitado no existe");

    const getCartProducts = await this.cartProductRepository
      .createQueryBuilder("cart_products")
      .where("cart_products.idCart_id = :cart_id", { cart_id: getCarrito._id })
      .getMany();

 
      
    if (!getCartProducts) {
      return { ...getCarrito, products: [] };
    } else {
      return { ...getCarrito, products:getCartProducts };
    }
  }

  /**
   *  @brief busca por id de carrito a un carrito
   *  @param IdCarrito IdCarrito
   *  @returns  CartUser o error
   */
  async getById(IdCarrito: string): Promise<any> {
    const getCarrito = await this.cartRepository
      .createQueryBuilder("carts")
      .where("carts._id = :_id", { _id: IdCarrito })
      .getOne();
    if (!getCarrito) throw new NotFound("El carrito solicitado no existe");

    const getCartProducts = await this.cartProductRepository
      .createQueryBuilder("cart_products")
      .where("cart_products.idCart_id = :cart_id", { cart_id: getCarrito._id })
      .getMany();



    if (!getCartProducts) {
      return { ...getCarrito, products: [] };
    } else {
      return { ...getCarrito, products:getCartProducts};
    }
  }

  /**
   *  @brief crea un nuevo carrito
   *  @param idUser id de usuario
   *  @returns  CartUser o error
   */

  async addCarrito(idUser: string): Promise<any> {
    const newCarrito = new Carts();

    newCarrito.idUser = parseInt(idUser);
    newCarrito.timestamp = `${moment().format("DD MM YYYY hh:mm")}`;

    const addCarrito = await this.cartRepository
      .createQueryBuilder()
      .insert()
      .into("carts")
      .values(newCarrito)
      .execute();

    if (!addCarrito) throw new NotFound("error al crear carrito");

    return addCarrito;
  }

  /**
   *  @brief elimina un carrito
   *  @param idCart  idCart
   */
  async delete(idCart: string) {
    const cast = parseInt(idCart);

    await this.cartProductRepository
      .createQueryBuilder()
      .delete()
      .from("cart_products")
      .where("cart_products.idCart_id = :_id", { _id: cast })
      .execute();

    const cartDelete = await this.cartRepository
      .createQueryBuilder()
      .delete()
      .from("carts")
      .where("carts._id = :_id", { _id: cast })
      .execute();

    if (cartDelete.affected === 0)
      throw new NotFound(" el carrito solicitado no existe");
  }
  /**
   *  @brief agrega un  nuevo  producto a  un carrito
   *  @params idCart  idProduct
   */
  async addProduct(idCart: string, idProduct: string) {
    const factory: FactoryCreateDao = FactoryCreateDao.getInstance();
    const { ProductsDao } = await factory.createInstances();

    const productoSeleccionado = await ProductsDao.getById(idProduct);

    console.log("PRODUCTO SELECCIONADOOOOOO", productoSeleccionado);

    const cartProduct = new CartProducts();
    cartProduct.idCart = parseInt(idCart);
    cartProduct.idProduct = parseInt(idProduct);
    cartProduct.name = productoSeleccionado.name;
    cartProduct.price = productoSeleccionado.price;
    cartProduct.stock = productoSeleccionado.stock;
    cartProduct.photo = productoSeleccionado.photo;
    cartProduct.code = productoSeleccionado.code;
    cartProduct.description = productoSeleccionado.description;
    cartProduct.timestamp = productoSeleccionado.timestamp;
    const add = await this.cartProductRepository
      .createQueryBuilder()
      .insert()
      .into("cart_products")
      .values(cartProduct)
      .execute();

      console.log(add)
    if (!add)
      throw new NotFound("Error al insertar  el producto en el carrito");
  }

  /**
   *  @brief elimina un producto de un  carrito
   *  @params idUser  productId
   */

  async deleteProduct(idCart: string, productId: string) {
    const cast = parseInt(idCart);
    const castProd = parseInt(productId);

    const msg = await this.cartProductRepository
      .createQueryBuilder()
      .delete()
      .from("cart_products")
      .where(
        "cart_products.cart_id = :_id AND cart_products.product_id = : _idProduct",
        { _id: cast, _idProduct: castProd }
      )
      .execute();
    if (msg.modifiedCount === 0) {
      throw new NotFound("El producto solicitado no existe en el carrito");
    }
  }

  static getInstance() {
    if (!instance) {
      instance = new CartMysql();
    }
    return instance;
  }
}
