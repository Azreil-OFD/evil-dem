import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
interface DecodedToken {
    login: string;
}
export default async (refreshToken: string) => {
    const refreshSecret = process.env.NUXT_AUTH_REFRESH_TOKEN_SALT as string;

    try {
        const decoded = jwt.verify(refreshToken, refreshSecret) as DecodedToken;

        const user = await prisma.user.findUnique({
            where: {
                login: decoded.login,
            },
        });

        if (!user) {
            throw new Error('Пользователя не существует');
        }
        return user;
    } catch (error) {
        throw new Error('Невалидный рефреш токен');
    }
};
