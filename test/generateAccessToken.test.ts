import { describe, test, expect } from 'vitest';
import jwt from 'jsonwebtoken';
import type { TokenData } from '~/utils/server/types';
import generateAccessToken from '~/utils/server/token/generateAccessToken';

describe('generateAccessToken', () => {
    test('должен генерировать действительный JWT токен', () => {
        const tokenData: TokenData = {
            fullName: 'John Doe',
            organization: 'Acme Corp',
            login: 'johndoe',
            role: 'admin',
        };

        process.env.NUXT_AUTH_TOKEN_SALT = 'test_secret';
        const token = generateAccessToken(tokenData);

        const decoded = jwt.verify(token, process.env.NUXT_AUTH_TOKEN_SALT!);
        expect(decoded).toHaveProperty('fullName', 'John Doe');
        expect(decoded).toHaveProperty('organization', 'Acme Corp');
        expect(decoded).toHaveProperty('login', 'johndoe');
        expect(decoded).toHaveProperty('role', 'admin');
    });

    test('должен выбрасывать ошибку, если секрет не определен', () => {
        const tokenData: TokenData = {
            fullName: 'John Doe',
            organization: 'Acme Corp',
            login: 'johndoe',
            role: 'admin',
        };

        delete process.env.NUXT_AUTH_TOKEN_SALT;

        expect(() => generateAccessToken(tokenData)).toThrowError(
            'NUXT_AUTH_TOKEN_SALT is not defined in environment variables'
        );
    });

    test('должен выбрасывать ошибку, если токен устарел', async () => {
        const signUpData: TokenData = {
            fullName: 'John Doe',
            organization: 'Acme Corp',
            login: 'johndoe',
            role: 'admin',
        };
        process.env.NUXT_AUTH_TOKEN_SALT = 'test_salt';
        const token = jwt.sign(signUpData, process.env.NUXT_AUTH_TOKEN_SALT!, {
            expiresIn: '1s',
        });

        await new Promise((resolve) => setTimeout(resolve, 2000));

        try {
            jwt.verify(token, process.env.NUXT_AUTH_TOKEN_SALT!);
        } catch (error) {
            expect(error).toBeInstanceOf(jwt.TokenExpiredError);
        }
    });

    test('должен выбрасывать ошибку, если токен невалидный', () => {
        const invalidToken = 'invalid.token.value';

        process.env.NUXT_AUTH_TOKEN_SALT = 'test_secret';

        try {
            jwt.verify(invalidToken, process.env.NUXT_AUTH_TOKEN_SALT!);
        } catch (error) {
            expect(error).toBeInstanceOf(jwt.JsonWebTokenError);
        }
    });
});
