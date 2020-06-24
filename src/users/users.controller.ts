import {Controller, Get, Put, Post, Body, Param} from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async index() {
        const user = await this.userService.find(2);
        // const users = this.userService.findAll();

        return {
            user
        };
    }

    @Post()
    create(@Body() user: User) {
        return this.userService.updateUser(user);
    }

    @Put(':id')
    async update(@Param('id') id, @Body() data: User) {
        await this.userService.test(data)
        const user = await this.userService.find(1);

        // const users = this.userService.findAll();

        // const users = await this.userService.findAll();
        // users.then(e => {
        //     console.log('e', e)
        // })

        return {
            id,
            user,
            data
        };
    }
}
