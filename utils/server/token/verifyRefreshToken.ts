import jwt from 'jsonwebtoken';
import { PrismaClient, type User } from '@prisma/client';
import type { DecodedToken } from '../types';

export default async (refreshToken: string) => {
    const refreshSecret = process.env.NUXT_AUTH_REFRESH_TOKEN_SALT as string;

    if (!refreshSecret) {
        throw new Error(
            'NUXT_AUTH_REFRESH_TOKEN_SALT is not defined in environment variables'
        );
    }

    try {
        const decoded = jwt.verify(refreshToken, refreshSecret) as DecodedToken;
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
            | any = await $fetch('http://localhost:3001/user/find-unique', {
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
