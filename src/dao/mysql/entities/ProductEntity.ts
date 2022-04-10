import { Entity, PrimaryGeneratedColumn, Column,OneToMany, BaseEntity } from "typeorm"
import { CartProducts } from "./CartProductEntity";
/**CREATE TABLE products (
    _id int not null AUTO_INCREMENT,
    name varchar(50),
    price int,
    stock int,
    photo varchar(200),
    code varchar(10),
    description varchar(200),
    timestamp varchar(50),
    PRIMARY KEY (_id)
); */
@Entity()
export class products extends BaseEntity {
    @PrimaryGeneratedColumn()
    _id: number

    @OneToMany(() => CartProducts, Carts => Carts.idProduct)
    productsCart: CartProducts[];


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