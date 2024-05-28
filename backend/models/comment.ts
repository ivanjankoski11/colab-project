import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Post } from "./post";

@Entity()
export class Comment extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    text!: string

    @ManyToOne(() => User, { eager: true })
    user!: User

    @ManyToOne(() => Post, (post) => post.comments)
    post!: Post

    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;
}