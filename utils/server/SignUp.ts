import { PrismaClient } from '@prisma/client';
import type { SignUpData } from './types';
import hashPassword from './hashPassword';
const prisma = new PrismaClient();

export default async (data: SignUpData) => {
    data.role = 'Клиент';
    let user;
    data.password = await hashPassword(data.password);
    try {
        user = await prisma.user.create({
            data: data,
        });
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
