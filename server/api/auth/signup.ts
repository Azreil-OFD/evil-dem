import SignUp from '~/utils/server/auth/SignUp';
import generateAccessToken from '~/utils/server/token/generateAccessToken';
import generateRefreshToken from '~/utils/server/token/generateRefreshToken';
import { SignUpData } from '~/utils/server/types';
import validateSignUp from '~/utils/server/auth/validateSignUp';

export default defineEventHandler(async (event) => {
    const body: SignUpData = await readBody(event);
    const { validate, message } = validateSignUp(body);

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

    const createUserResult = await SignUp(body);
    
    if (!createUserResult) {
        return {
            data: null,
            error: {
                code: 500,
                message: 'Internal Server Error',
            },
        };
    }

    if (!createUserResult.status) {
        return {
            data: null,
            error: {
                code: 409,
                message: createUserResult.error,
            },
        };
    }
    console.log(createUserResult)
    if (createUserResult.user) {

        return {
            data: {
                token: generateAccessToken(createUserResult.user),
                refresh: generateRefreshToken(createUserResult.user),
            },
            error: null,
        };
    }

    return {
        data: null,
        error: {
            code: 500,
            message: 'Internal Server Error',
        },
    };
});
