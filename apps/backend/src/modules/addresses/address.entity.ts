import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('addresses')
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    street: string;

    @Column({ nullable: true })
    neighborhood: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column({ nullable: true })
    zipCode: string;

    @Column({ nullable: true })
    number: string;

    @Column({ nullable: true })
    complement: string;

    @Column({ type: 'float8', nullable: true })
    latitude: number;

    @Column({ type: 'float8', nullable: true })
    longitude: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
