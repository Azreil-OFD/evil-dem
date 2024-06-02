import { describe, test, expect } from 'vitest';
import bcrypt from 'bcrypt';
import hashPassword from '~/utils/server/auth/hashPassword';

describe('hashPassword', () => {
    test('должен возвращать захешированный пароль', async () => {
        const password = 'myPassword123';
        const hashedPassword = await hashPassword(password);

        expect(hashedPassword).not.toBe(password);
        expect(typeof hashedPassword).toBe('string');

        const isValid = await bcrypt.compare(password, hashedPassword);
        expect(isValid).toBe(true);
    });

    test('должен возвращать разные хеши для одного и того же пароля', async () => {
        const password = 'myPassword123';
        const hashedPassword1 = await hashPassword(password);
        const hashedPassword2 = await hashPassword(password);

        expect(hashedPassword1).not.toBe(hashedPassword2);

        const isValid1 = await bcrypt.compare(password, hashedPassword1);
        const isValid2 = await bcrypt.compare(password, hashedPassword2);
        expect(isValid1).toBe(true);
        expect(isValid2).toBe(true);
    });

    test('должен обрабатывать пустой пароль', async () => {
        const password = '';
        const hashedPassword = await hashPassword(password);

        expect(typeof hashedPassword).toBe('string');

        const isValid = await bcrypt.compare(password, hashedPassword);
        expect(isValid).toBe(true);
    });

    test('должен обрабатывать очень длинный пароль', async () => {
        const password = 'a'.repeat(1000);
        const hashedPassword = await hashPassword(password);

        expect(typeof hashedPassword).toBe('string');

        const isValid = await bcrypt.compare(password, hashedPassword);
        expect(isValid).toBe(true);
    });
});
