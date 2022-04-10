import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from "typeorm"
import { CartProducts } from "./CartProductEntity";
import { Users } from "./UserEntity"
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
@Entity()
export class Carts extends BaseEntity {
    @PrimaryGeneratedColumn()
    _id: number
    

    @ManyToOne(() => Users, Users => Users.Carts)
    idUser: number;

    @OneToMany(() => CartProducts, CartProducts => CartProducts.idCart)
    productsCart: CartProducts[];

    @Column({
      length: 50,
  })
    timestamp: string
}