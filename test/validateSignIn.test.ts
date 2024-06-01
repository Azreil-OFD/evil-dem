import { describe, test, expect } from 'vitest';
import type { SignInData, ValidationResult } from '~/utils/server/types';
import validateSignIn from '~/utils/server/validateSignIn';

describe('validateSignIn', () => {
    test('должен вернуть validate: true, если все поля присутствуют и корректны', () => {
        const data: SignInData = {
            login: 'user',
            password: 'password123',
        };
        const result: ValidationResult = validateSignIn(data);
        expect(result.validate).toBe(true);
        expect(result.message).toBeNull();
    });

    test('должен вернуть validate: false, если отсутствует поле login', () => {
        const data: Partial<SignInData> = {
            password: 'password123',
        };
        const result: ValidationResult = validateSignIn(data);
        expect(result.validate).toBe(false);
        expect(result.message).toBe('Отсутствует или некорректное поле: login');
    });

    test('должен вернуть validate: false, если отсутствует поле password', () => {
        const data: Partial<SignInData> = {
            login: 'user',
        };
        const result: ValidationResult = validateSignIn(data);
        expect(result.validate).toBe(false);
        expect(result.message).toBe(
            'Отсутствует или некорректное поле: password'
        );
    });

    test('должен вернуть validate: false, если поле login не строка', () => {
        const data: Partial<SignInData> = {
            login: 123 as unknown as string,
            password: 'password123',
        };
        const result: ValidationResult = validateSignIn(data);
        expect(result.validate).toBe(false);
        expect(result.message).toBe('Отсутствует или некорректное поле: login');
    });

    test('должен вернуть validate: false, если поле password не строка', () => {
        const data: Partial<SignInData> = {
            login: 'user',
            password: 123 as unknown as string,
        };
        const result: ValidationResult = validateSignIn(data);
        expect(result.validate).toBe(false);
        expect(result.message).toBe(
            'Отсутствует или некорректное поле: password'
        );
    });

    test('должен вернуть validate: false, если поле login пустая строка', () => {
        const data: Partial<SignInData> = {
            login: '',
            password: 'password123',
        };
        const result: ValidationResult = validateSignIn(data);
        expect(result.validate).toBe(false);
        expect(result.message).toBe('Отсутствует или некорректное поле: login');
    });

    test('должен вернуть validate: false, если поле password пустая строка', () => {
        const data: Partial<SignInData> = {
            login: 'user',
            password: '',
        };
        const result: ValidationResult = validateSignIn(data);
        expect(result.validate).toBe(false);
        expect(result.message).toBe(
            'Отсутствует или некорректное поле: password'
        );
    });
});
