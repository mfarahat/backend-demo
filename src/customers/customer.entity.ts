import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Purchase } from "../purchases/purchase.entity";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @OneToMany(type => Purchase, purchase => purchase.customer)
    purchases: Purchase[]
}