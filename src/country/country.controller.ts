import { Controller, Get } from '@nestjs/common';
import {CountryService} from "./country.service";

@Controller('country')
export class CountryController {
    constructor(private readonly companyService: CountryService) {}

    @Get()
    async index() {
        return await this.companyService.findAll();
    }
}
