import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("customer")
export class CustomerEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
}