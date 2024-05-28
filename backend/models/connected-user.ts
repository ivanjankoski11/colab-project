import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ConnectedUser extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: string;

	@Column()
	email!: string;

    @Column({ nullable: true })
	roomId?: string;
}
