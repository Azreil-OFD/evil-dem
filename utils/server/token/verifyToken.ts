import jwt from 'jsonwebtoken';
import { PrismaClient, type User } from '@prisma/client';
import type { DecodedToken } from '../types';

export default async (refreshToken: string) => {
    const refreshSecret = process.env.NUXT_AUTH_TOKEN_SALT as string;
    console.log(refreshToken);
    if (!refreshSecret) {
        throw new Error(
            'NUXT_AUTH_REFRESH_TOKEN_SALT is not defined in environment variables'
        );
    }

    try {
        const decoded = jwt.verify(refreshToken, refreshSecret) as DecodedToken;
        console.log(decoded);
        let user:
            | {
                  data: User;
                  status: boolean;
              }
            | any;
        const data:
            | {
                  data: User;
                  status: boolean;
              }
            | any = await $fetch('http://10.8.0.3:3000/user/find-unique', {
            method: 'POST',
            body: {
                login: decoded.login,
            },
        });

        user = data;

        if (!user) {
            throw new Error('Пользователь не существует');
        }

        return user;
    } catch (error) {
        throw new Error('Невалидный рефреш токен');
    }
};
