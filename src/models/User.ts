import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
interface AppointmentConstructorDTO {
	provider: string;
	date: Date;
}

@Entity('users')
export default class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	@Column()
	name: string;
	@Column()
	email: string;
	@Column()
	password: string;
	@Column()
	avatar: string;
	@CreateDateColumn()
	created_at: Date;
	@UpdateDateColumn()
	updated_at: Date;
}
