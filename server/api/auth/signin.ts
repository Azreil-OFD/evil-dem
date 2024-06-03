import SignIn from '~/utils/server/auth/SignIn';
import generateAccessToken from '~/utils/server/token/generateAccessToken';
import generateRefreshToken from '~/utils/server/token/generateRefreshToken';
import { SignInData } from '~/utils/server/types';
import validateSignIn from '~/utils/server/auth/validateSignIn';
import { useRequestHeaders } from 'nuxt/app';

export default defineEventHandler(async (event) => {
    const body: SignInData = await readBody(event);
    const { validate, message } = validateSignIn(body);
    if (!validate) {
        setResponseStatus(event, 400);
        return {
            data: null,
            error: {
                code: 400,
                message,
            },
        };
    }

    const createUserResult = await SignIn(body);

    if (!createUserResult.status || !createUserResult.user) {
        return {
            data: null,
            error: {
                code: 409,
                message: 'Неверный логин или пароль!',
            },
        };
    }

    return {
        data: {
            token: generateAccessToken(createUserResult.user),
            refresh: generateRefreshToken(createUserResult.user),
        },
        error: null,
    };
});
