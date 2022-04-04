import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from "typeorm"
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
    
    @OneToOne(() => Users)
    @JoinColumn()
    user: Users

    @Column({
      length: 50,
  })
    timestamp: string
}