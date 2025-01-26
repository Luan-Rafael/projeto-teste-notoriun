import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Institution } from '../institutions/institution.entity';
import { Address } from '../addresses/address.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column({ unique: true })
    email: string;

    @OneToOne(() => Institution, (institution) => institution.user, {
        nullable: true,
    })
    institution: Institution;

    @OneToOne(() => Address)
    address: Address;

    @Column({ nullable: true })
    code: string;

    @Column({ type: 'timestamp', nullable: true })
    code_expires: Date;

    @Column({ type: 'timestamp', nullable: true })
    confirmed_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
