import { Injectable, Inject } from '@nestjs/common';
import { Repository, getConnection } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async find(id) {
        return this.userRepository.findOne(id);
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