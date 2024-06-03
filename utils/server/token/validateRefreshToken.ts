import type { RefreshTokenData, ValidationResult } from '../types';

export default (data: RefreshTokenData): ValidationResult => {
    const requiredFields: (keyof RefreshTokenData)[] = ['refreshToken'];

    for (const field of requiredFields) {
        const value = data[field];
        if (typeof value !== 'string' || value.trim() === '') {
            return {
                validate: false,
                message: `Отсутствует или некорректное поле: ${field}`,
            };
        }
    }

    return {
        validate: true,
        message: null,
    };
};
