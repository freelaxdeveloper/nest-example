import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('company')
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 255 })
    email: string;

    @Column({ length: 255 })
    phone: string;
}
