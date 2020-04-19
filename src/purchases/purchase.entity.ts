import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Customer } from "../customers/customer.entity";

@Entity()
export class Purchase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    value: number;

    @ManyToOne(type => Customer, customer => customer.purchases)
    customer: Customer;
}