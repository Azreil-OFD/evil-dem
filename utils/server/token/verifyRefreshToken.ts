import jwt from 'jsonwebtoken';
import { PrismaClient } from '~/electron/client';
import type { DecodedToken } from '../types';

const prisma = new PrismaClient();

export default async (refreshToken: string) => {
    const refreshSecret = process.env.NUXT_AUTH_REFRESH_TOKEN_SALT as string;

    if (!refreshSecret) {
        throw new Error(
            'NUXT_AUTH_REFRESH_TOKEN_SALT is not defined in environment variables'
        );
    }

    try {
        const decoded = jwt.verify(refreshToken, refreshSecret) as DecodedToken;

        const user = await prisma.user.findUnique({
            where: {
                login: decoded.login,
            },
        });

        if (!user) {
            throw new Error('Пользователь не существует');
        }

        return user;
    } catch (error) {
        throw new Error('Невалидный рефреш токен');
    }
};
