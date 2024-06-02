import { PrismaClient } from '@prisma/client';
import type { SignUpData } from '../types';
import hashPassword from './hashPassword';

export default async (user_data: SignUpData) => {
    user_data.role = 'Клиент';
    let user;

    user_data.password = await hashPassword(user_data.password);
    try {
        const data = await $fetch('http://10.8.0.3:3000/user/create', {
            method: 'POST',
            body: user_data,
        });
        user = data;
    } catch (error) {
        console.log(error);
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
