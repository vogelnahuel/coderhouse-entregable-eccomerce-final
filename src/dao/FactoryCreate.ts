import { CartDao } from "./mongo/cartDao";
import { ProductsDao } from "./mongo/productDao";
import { UserDao } from "./mongo/usersDao";
import { ProductMysql } from "./mysql/ProductDaoMysql";
import { CartMysql } from "./mysql/CartDaoMysql";
import { UserMysql } from "./mysql/UserDaoMysql";

let instance = null;
//PATRON FACTORY
export class FactoryCreateDao {
  constructor() {}
  public async createInstances() {

    if (process.env.DATABASE === "mongo") {
       
      return {
        ProductsDao: ProductsDao.getInstance(),
        CartDao: CartDao.getInstance(),
        UserDao: UserDao.getInstance(),
      };
    }
    else if (process.env.DATABASE === "mysql"){
      return {
        ProductsDao: ProductMysql.getInstance(),
        CartDao: CartMysql.getInstance(),
        UserDao: UserMysql.getInstance(),
      };
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
