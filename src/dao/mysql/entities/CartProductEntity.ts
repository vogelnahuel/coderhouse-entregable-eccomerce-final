import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { Carts } from "./CartEntity"
import { products } from "./ProductEntity"
/*CREATE TABLE cartproducts (
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
export class CartProducts extends BaseEntity {
    @PrimaryGeneratedColumn()
    _id: number

    @ManyToOne(() => products, Users => Users.productsCart)
    idProduct: number;

    @ManyToOne(() => Carts, Users => Users.productsCart)
    idCart: number;


    @Column({
      length: 50,
  })
    name: string

    @Column()
    price: number

    @Column()
    stock: number

    @Column({
      length: 200,
  })
    photo: string

    @Column({
      length: 10,
  })
    code: string

    @Column({
      length: 200,
  })
    description: string
    
    @Column({
      length: 50,
  })
    timestamp: string

}