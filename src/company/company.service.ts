import { Injectable, Inject } from '@nestjs/common';
import { Repository, getConnection } from 'typeorm';
import {Company} from "./company.entity";
import { InjectRepository } from '@nestjs/typeorm';

import {Pagination, POSTService, PUTService} from '../services';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private userRepository: Repository<Company>,
    ) {}

    async findAll(request, response) {
        const pagination = new Pagination(request, 'company', 15);

        pagination.setFilterResolver([
            'country_id',
            'saler_id',
            'is_active',
            'name',
            'email',
            {
                key: 'phone_or_mail',
                columns: ['email', 'phone'],
            }
        ]);

        const filterQuery = pagination.getFilterQuery();
        const query = "" +
            "SELECT `company`.*, `module`.* " +
            "FROM `company` " +
            "LEFT JOIN `module` ON `company`.`id` = `module`.`company_id` " + filterQuery.query + " " +
            "ORDER BY `company`.`id` DESC";

        await pagination.setDataAndTotal(this.userRepository, query, filterQuery.params);

        return pagination.response(response);
    }

    async store(request, response) {
        const whiteListKeys = [
            'name',
            'official_name',
            'email',
            'phone',
            'country_id',
            'city_id',
            'vat_num',
            'zip_code',
            'address',
            'description',
            'logo',
            'language',
            'api_key',
            'payment_status',
            'payment_method',
            'is_no_branding',
            'is_pilot',
            'contract_length',
            'start_at',
            'end_at',
            'price',
            'setup_fee',
            'note',
            'saler_note',
            'saler_id',
            'training',
            'bot_created_type',
            'recommender_id',
        ];

        const service = new POSTService(request, 'company', 0);

        service.setWhiteListKeys(whiteListKeys);

        return await service.save(this.userRepository);
    }

    async update(request, response, id) {
        const whiteListKeys = [
            'name',
            'official_name',
            'email',
            'phone',
            'country_id',
            'city_id',
            'vat_num',
            'zip_code',
            'address',
            'description',
            'logo',
            'language',
            'api_key',
            'payment_status',
            'payment_method',
            'is_no_branding',
            'is_pilot',
            'contract_length',
            'start_at',
            'end_at',
            'price',
            'setup_fee',
            'note',
            'saler_note',
            'saler_id',
            'training',
            'bot_created_type',
            'recommender_id',
        ];

        const service = new PUTService(request, 'company', id);

        service.setWhiteListKeys(whiteListKeys);

        const data = await service.save(this.userRepository);

        return data;
    }
}
