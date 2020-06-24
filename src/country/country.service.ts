import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {Country} from "./country.entity";
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CountryService {
    constructor(
        @InjectRepository(Country)
        private userRepository: Repository<Country>,
    ) {}

    async findAll() {
        return await this.userRepository.createQueryBuilder('country').orderBy("country.name").getMany();
    }
}
