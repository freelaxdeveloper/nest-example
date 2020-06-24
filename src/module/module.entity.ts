import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('module')
export class Module {
    @PrimaryGeneratedColumn()
    company_id: number;

    @Column('tinyint')
    is_page: number;

    @Column('tinyint')
    is_video: number;

    @Column('tinyint')
    is_chat: number;

    @Column('tinyint')
    is_embed: number;

    @Column('tinyint')
    is_live_chat: number;

    @Column('tinyint')
    is_callback: number;

    @Column('tinyint')
    is_media: number;

    @Column('tinyint')
    is_feedback: number;

    @Column('tinyint')
    is_modal: number;

    @Column('tinyint')
    is_remarketing: number;

    @Column('tinyint')
    is_messaging: number;

    @Column('tinyint')
    is_gen2_bots: number;

    @Column('tinyint')
    is_customer_profiles: number;

    @Column('tinyint')
    is_banner_bots: number;
}
