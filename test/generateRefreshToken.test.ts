import { describe, test, expect } from 'vitest';
import jwt from 'jsonwebtoken';
import type { TokenData } from '~/utils/server/types';
import generateRefreshToken from '~/utils/server/token/generateRefreshToken';

describe('generateRefreshToken', () => {
    test('должен генерировать действительный рефреш JWT токен', () => {
        const signUpData: TokenData = {
            fullName: 'John Doe',
            organization: 'Acme Corp',
            login: 'johndoe',
            role: 'admin',
        };

        process.env.NUXT_AUTH_REFRESH_TOKEN_SALT = 'refresh_test_secret';
        const token = generateRefreshToken(signUpData);

        const decoded = jwt.verify(
            token,
            process.env.NUXT_AUTH_REFRESH_TOKEN_SALT!
        );
        expect(decoded).toHaveProperty('fullName', 'John Doe');
        expect(decoded).toHaveProperty('organization', 'Acme Corp');
        expect(decoded).toHaveProperty('login', 'johndoe');
        expect(decoded).toHaveProperty('role', 'admin');
    });

    test('должен выбрасывать ошибку, если рефреш секрет не определен', () => {
        const tokenData: TokenData = {
            fullName: 'John Doe',
            organization: 'Acme Corp',
            login: 'johndoe',
            role: 'admin',
        };

        delete process.env.NUXT_AUTH_REFRESH_TOKEN_SALT;

        expect(() => generateRefreshToken(tokenData)).toThrowError(
            'NUXT_AUTH_REFRESH_TOKEN_SALT is not defined in environment variables'
        );
    });
});
