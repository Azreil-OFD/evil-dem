import type { EventHandler, EventHandlerRequest } from 'h3';
import type { RefreshTokenData, ValidationResult } from './types';

export default (data: RefreshTokenData): ValidationResult => {
    const requiredFields: (keyof RefreshTokenData)[] = ['refreshToken'];

    for (const field of requiredFields) {
        if (
            !data.hasOwnProperty(field) ||
            typeof data[field] !== 'string' ||
            (data[field] as string).trim() === ''
        ) {
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
