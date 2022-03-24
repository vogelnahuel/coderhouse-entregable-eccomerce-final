
export interface User {
    _id:string
    email: string;
    password: string;
    name: string;
    age: number;
    address: string;
    phone: string;
    avatar: string;
  }
export interface createUser {
  email: string;
  password: string;
  name: string;
  age: number;
  address: string;
  phone: string;
  avatar: string;
}

export interface loginUser {
  email: string;
  password: string;
}
export interface buyUser {
  email: string;
  phone: string;
  name: string;
  productList: [];
}

export interface success {
  text: string;
}
export interface LoginPostSucess {
  token: string;
  carritoUser: any;
  resUser: any;
}
