import { Injectable } from '@nestjs/common';
import { Repository, getConnection } from 'typeorm';
import { User } from './user.entity';
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    find(id) {
        return this.userRepository.query('SELECT * FROM `user` WHERE `id` = ? LIMIT 1', [id]);
    }

    async updateUser(user: User) {
        await this.userRepository.save(user)
    }

    async test(data) {
        await getConnection()
            .createQueryBuilder()
            .update(User)
            .set(data)
            .where("id = :id", { id: 1 })
            .execute();
    }
}
