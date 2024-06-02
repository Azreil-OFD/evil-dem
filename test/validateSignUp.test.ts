import type { SignUpData, ValidationResult } from '~/utils/server/types';
import validateSignUp from '../utils/server/validateSignUp';
import { describe, test, expect } from 'vitest';

describe('validateSignUp', () => {
    test('должен возвращать true для валидных данных', () => {
        const validData: Partial<SignUpData> = {
            fullName: 'Иван Иванов',
            organization: 'ООО Пример',
            login: 'ivan123',
            password: 'пароль123',
        };

        const result: ValidationResult = validateSignUp(validData);
        expect(result).toEqual({ validate: true, message: null });
    });

    test('должен возвращать ошибку для отсутствующего поля fullName', () => {
        const invalidData: Partial<SignUpData> = {
            organization: 'ООО Пример',
            login: 'ivan123',
            password: 'пароль123',
        };

        const result: ValidationResult = validateSignUp(invalidData);
        expect(result).toEqual({
            validate: false,
            message: 'Отсутствует или некорректное поле: fullName',
        });
    });

    test('должен возвращать ошибку для короткого поля fullName', () => {
        const invalidData: Partial<SignUpData> = {
            fullName: 'И',
            organization: 'ООО Пример',
            login: 'ivan123',
            password: 'пароль123',
        };

        const result: ValidationResult = validateSignUp(invalidData);
        expect(result).toEqual({
            validate: false,
            message: 'Поле fullName должно содержать не менее 2 символов',
        });
    });

    test('должен возвращать ошибку для отсутствующего поля organization', () => {
        const invalidData: Partial<SignUpData> = {
            fullName: 'Иван Иванов',
            login: 'ivan123',
            password: 'пароль123',
        };

        const result: ValidationResult = validateSignUp(invalidData);
        expect(result).toEqual({
            validate: false,
            message: 'Отсутствует или некорректное поле: organization',
        });
    });

    test('должен возвращать ошибку для короткого поля organization', () => {
        const invalidData: Partial<SignUpData> = {
            fullName: 'Иван Иванов',
            organization: 'О',
            login: 'ivan123',
            password: 'пароль123',
        };

        const result: ValidationResult = validateSignUp(invalidData);
        expect(result).toEqual({
            validate: false,
            message: 'Поле organization должно содержать не менее 2 символов',
        });
    });

    test('должен возвращать ошибку для отсутствующего поля login', () => {
        const invalidData: Partial<SignUpData> = {
            fullName: 'Иван Иванов',
            organization: 'ООО Пример',
            password: 'пароль123',
        };

        const result: ValidationResult = validateSignUp(invalidData);
        expect(result).toEqual({
            validate: false,
            message: 'Отсутствует или некорректное поле: login',
        });
    });

    test('должен возвращать ошибку для короткого поля login', () => {
        const invalidData: Partial<SignUpData> = {
            fullName: 'Иван Иванов',
            organization: 'ООО Пример',
            login: 'iv',
            password: 'пароль123',
        };

        const result: ValidationResult = validateSignUp(invalidData);
        expect(result).toEqual({
            validate: false,
            message: 'Поле login должно содержать не менее 5 символов',
        });
    });

    test('должен возвращать ошибку для отсутствующего поля password', () => {
        const invalidData: Partial<SignUpData> = {
            fullName: 'Иван Иванов',
            organization: 'ООО Пример',
            login: 'ivan123',
        };

        const result: ValidationResult = validateSignUp(invalidData);
        expect(result).toEqual({
            validate: false,
            message: 'Отсутствует или некорректное поле: password',
        });
    });

    test('должен возвращать ошибку для короткого поля password', () => {
        const invalidData: Partial<SignUpData> = {
            fullName: 'Иван Иванов',
            organization: 'ООО Пример',
            login: 'ivan123',
            password: '123',
        };

        const result: ValidationResult = validateSignUp(invalidData);
        expect(result).toEqual({
            validate: false,
            message:
                'Поле password должно содержать не менее 8 символов и как минимум одну цифру',
        });
    });

    test('должен возвращать ошибку для поля password без цифры', () => {
        const invalidData: Partial<SignUpData> = {
            fullName: 'Иван Иванов',
            organization: 'ООО Пример',
            login: 'ivan123',
            password: 'парольпароль',
        };

        const result: ValidationResult = validateSignUp(invalidData);
        expect(result).toEqual({
            validate: false,
            message:
                'Поле password должно содержать не менее 8 символов и как минимум одну цифру',
        });
    });
});
