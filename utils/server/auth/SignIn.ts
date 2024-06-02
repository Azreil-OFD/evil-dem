import { PrismaClient } from '~/electron/client';
import bcrypt from 'bcrypt';
import type { SignInData } from '../types';

const prisma = new PrismaClient();

export default async (data: SignInData) => {
    let user;
    try {
        user = await prisma.user.findUnique({
            where: {
                login: data.login,
            },
        });

        if (!user) {
            return {
                status: false,
                user: null,
                error: 'Неверный логин или пароль',
            };
        }

        const passwordValid = await bcrypt.compare(
            data.password,
            user.password
        );

        if (!passwordValid) {
            return {
                status: false,
                user: null,
                error: 'Неверный логин или пароль',
            };
        }
    } catch (error) {
        return {
            status: false,
            user: null,
            error: error,
        };
    }

    return {
        status: true,
        user: user,
        error: null,
    };
};
