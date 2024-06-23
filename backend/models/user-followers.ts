import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";


@Entity()
export class UserFollowers extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => User)
    @JoinColumn()
    user!: User;

    @ManyToOne(() => User)
    @JoinColumn()
    following!: User;
}