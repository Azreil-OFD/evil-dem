import type { SignUpData, ValidationResult } from './types';

export default (data: Partial<SignUpData>): ValidationResult => {
    const requiredFields: (keyof SignUpData)[] = [
        'fullName',
        'organization',
        'login',
        'password',
    ];

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

    if ((data.fullName as string).trim().length < 2) {
        return {
            validate: false,
            message: 'Поле fullName должно содержать не менее 2 символов',
        };
    }

    if ((data.organization as string).trim().length < 2) {
        return {
            validate: false,
            message: 'Поле organization должно содержать не менее 2 символов',
        };
    }

    if ((data.login as string).trim().length < 5) {
        return {
            validate: false,
            message: 'Поле login должно содержать не менее 5 символов',
        };
    }

    const password = data.password as string;
    if (password.trim().length < 8 || !/\d/.test(password)) {
        return {
            validate: false,
            message:
                'Поле password должно содержать не менее 8 символов и как минимум одну цифру',
        };
    }

    return {
        validate: true,
        message: null,
    };
};
