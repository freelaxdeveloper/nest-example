import {Controller, Get, Req, Res, Post, Put, Param} from '@nestjs/common';
import {CompanyService} from "./company.service";
import { Response, Request } from 'express';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Get()
    index(@Req() request: Request, @Res() response: Response) {
        return this.companyService.findAll(request, response);
    }

    @Post()
    async store(@Req() request: Request, @Res() response: Response) {
        const data = await this.companyService.store(request, response);

        return response.status(200).json({
            message: 'Success',
            data
        });
    }

    @Put(':id')
    async update(@Req() request: Request, @Res() response: Response, @Param('id') id: number) {
        if (!id || isNaN(id)) {
            return response.status(400).json({
                message: 'companyId is not valid!',
            });
        }

        const data = await this.companyService.update(request, response, id);

        return response.status(200).json({
            message: 'Success',
            data,
            id,
        });
    }
}
