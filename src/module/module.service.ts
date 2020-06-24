import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import {Module} from "./module.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ModuleService {
    constructor(
        @InjectRepository(Module)
        private userRepository: Repository<Module>,
    ) {}

    async findAll() {
        return await this.userRepository.find();
    }

    async update(request, response, id) {
        const { key, value } = request.body;

        const data = await this.userRepository.query("UPDATE `module` SET " + key + " = ? WHERE `company_id` = ? LIMIT 1",
            [
                Number(value),
                Number(id)
            ]);

        return data;
    }
}
