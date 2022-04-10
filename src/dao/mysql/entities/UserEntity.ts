import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import { Carts } from "./CartEntity"
/*CREATE TABLE users (
    _id int not null AUTO_INCREMENT,
    email varchar(100),
    password varchar(100),
    name varchar(100),
    age int,
    address varchar(100),
    phone varchar(50),
    avatar varchar(200),
    PRIMARY KEY (_id)
);*/

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    _id: number

    @OneToMany(() => Carts, Carts => Carts.idUser)
    Carts: Carts[];


    @Column({
        length: 100,
    })
    email: string

    @Column({
        length: 100,
    })
    password: string

    @Column({
        length: 100,
    })
    name: string

    @Column()
    age: number
    
    @Column({
        length: 100,
    })
    address: string
    
    @Column({
        length: 50,
    })
    phone: string
    
    @Column({
        length: 200,
    })
    avatar: string

  
}