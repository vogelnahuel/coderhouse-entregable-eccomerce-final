import { CartDao } from "./cartDao";
import { ProductsDao } from "./productDao";
import { UserDao } from "./usersDao";
import mongoose from "mongoose";
import mongoDB from "../constants/mongoUrl";

let instance = null;
//PATRON FACTORY
export class FactoryCreateDao {
  constructor() {}
  public async createInstances() {
    if (process.env.DATABASE === "mongo") {
       await mongoose.connect(mongoDB);
      return {
        ProductsDao: ProductsDao.getInstance(),
        CartDao: CartDao.getInstance(),
        UserDao: UserDao.getInstance(),
      };
    } else if (process.env.DATABASE === "firebase") {
    } else if (process.env.DATABASE === "mysql"){
      
    }
  }
  

  //PATRON SINGLETON
  static getInstance() {
    if (!instance) {
      instance = new FactoryCreateDao();
    }
    return instance;
  }
}
