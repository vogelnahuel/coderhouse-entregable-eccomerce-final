export interface Products {
  _id: string | number;
  name: string;
  price: number;
  stock: number;
  photo: string;
  code: string;
  description: string;
  timestamp: string;
  __v?: number;
}

export interface ProductRequest {
  name: string;
  price: number;
  stock: number;
  photo: string;
  code: string;
  description: string;
}

export interface ProductUpdateRequest {
  _id: string;
  name?: string;
  price?: number;
  stock?: number;
  photo?: string;
  code?: string;
  description?: string;
  timestamp?: string;
}
