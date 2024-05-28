import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    lastname!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;
}