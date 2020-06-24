import {Controller, Get, Param, Put, Req, Res} from '@nestjs/common';
import {ModuleService} from "./module.service";
import { Response, Request } from 'express';

@Controller('module')
export class ModuleController {
    constructor(private readonly moduleService: ModuleService) {}

    @Get()
    index() {
        return this.moduleService.findAll();
    }

    @Put(':id')
    async update(@Req() request: Request, @Res() response: Response, @Param('id') id: number) {
        if (!id || isNaN(id)) {
            return response.status(400).json({
                message: 'companyId is not valid!',
            });
        }
        const { key, value } = request.body;

        if (!key || !value) {
            return response.status(400).json({
                message: 'Key and value is required!',
                body: request.body
            });
        }

        if (value < 0 || value > 1 || isNaN(Number(value))) {
            return response.status(400).json({
                message: 'Value is not valid!',
            });
        }

        const whiteListKeys = [
            'is_page',
            'is_video',
            'is_chat',
            'is_embed',
            'is_live_chat',
            'is_callback',
            'is_media',
            'is_feedback',
            'is_modal',
            'is_remarketing',
            'is_messaging',
            'is_gen2_bots',
            'is_customer_profiles',
            'is_banner_bots',
        ];

        if (!whiteListKeys.includes(key)) {
            return response.status(400).json({
                message: 'Key is not valid!',
            });
        }

        const data = await this.moduleService.update(request, response, id);

        return response.status(200).json({
            message: 'Success',
            data,
            id,
        });
    }
}
