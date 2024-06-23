import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Comment } from "./comment";

@Entity()
export class Post extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string

    @Column()
    text!: string

    @ManyToOne(() => User, { eager: true })
    user!: User

    @OneToMany(() => Comment, (comment) => comment.post, { eager: true })
    comments?: Comment[]

    @Column()
    upVotes!: number

    @Column()
    downVotes!: number

    @CreateDateColumn()
    createdAt?: Date
}