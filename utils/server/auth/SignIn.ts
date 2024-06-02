import { PrismaClient, type User } from '@prisma/client';
import bcrypt from 'bcrypt';
import type { SignInData } from '../types';

const prisma = new PrismaClient();

export default async (user_data: SignInData) => {
    let user: User;
    try {
        const { data } = await $fetch('http://10.8.0.3:3000/user/create', {
            method: 'POST',
            body: {
                login: user_data.login,
            },
        });
        user = data;
        if (!user) {
            return {
                status: false,
                user: null,
                error: 'Неверный логин или пароль',
            };
        }

        const passwordValid = await bcrypt.compare(
            user_data.password,
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
