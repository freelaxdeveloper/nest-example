import {Controller, Get, Param, Post, Res, Req} from '@nestjs/common';
import {Response, Request} from 'express';
import axios from 'axios';

@Controller('auth')
export class AuthController {

    @Get('/user')
    async user(@Res() response: Response, @Req() request: Request) {
        const token: string | undefined = request.headers.authorization?.split(' ')[1];

        try {
            const { data } = await axios.get(`${process.env.SSO_APP_URL}/auth/get-auth-user`, {
                params: {
                    access_token: token,
                },
                headers: {
                    'X-Leadoo-App-Auth': process.env.X_LEADOO_APP_AUTH,
                    'User-Agent': request.get('User-Agent'),
                    'remoteAddress': request.connection.remoteAddress,
                },
            });
            return response.status(200).json(data);
        } catch (e) {
            return response.status(e.response.status).json({ message: e.response.data!.message || 'Forbidden!' });
        }
    }

    @Get('user-by-code/:code')
    async userByCode(@Param('code') code: string, @Res() response: Response, @Req() request: Request) {
        try {
            const { data } = await axios.post(`${process.env.SSO_APP_URL}/auth/get-auth-user` as string, {
                adminApiToken: 'admin-app',
                code
            });

            return response.status(200).json({
                jwt: data.jwt,
                refreshToken: data.refreshToken,
                user: data.user
            });
        } catch (e) {
            return response.status(500).json({ message: e });
        }
    }

}
