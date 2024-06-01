import type { SignInData, ValidationResult } from './types';

export default (data: Partial<SignInData>): ValidationResult => {
    const requiredFields: (keyof SignInData)[] = ['login', 'password'];

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
