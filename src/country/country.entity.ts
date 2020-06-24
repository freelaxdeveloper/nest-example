import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('country')
export class Country {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 4 })
    code2: string;
}
