import { Products } from "./productInterfaces";

export interface CartUser {
  _id: string;
  _idUser: string;
  products: Products[];
  timestamp: string;
  __v: number;
}
export interface CartCreate {
  idUser: string;
}

export interface cartProduct {
  idCart: string;
  idProduct: string;
}
