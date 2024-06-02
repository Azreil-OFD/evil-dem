import SignUp from '~/utils/server/SignUp';
import generateAccessToken from '~/utils/server/generateAccessToken';
import generateRefreshToken from '~/utils/server/generateRefreshToken';
import { SignUpData } from '~/utils/server/types';
import validateSignUp from '~/utils/server/validateSignUp';

export default defineEventHandler(async (event) => {
    const body: SignUpData = await readBody(event);
    const validate = validateSignUp(body);
    if (!validate.validate) {
        setResponseStatus(event, 400);
        return {
            data: null,
            error: {
                code: 400,
                message: validate.message,
            },
        };
    }
    const createUserResult = await SignUp(body);
    if (createUserResult) {
        if (createUserResult.status) {
            if (createUserResult.user)
                return {
                    data: {
                        token: generateAccessToken(createUserResult.user),
                        refresh: generateRefreshToken(createUserResult.user),
                    },
                    error: null,
                };
        } else {
            return {
                data: null,
                error: {
                    code: 409,
                    message: createUserResult.error,
                },
            };
        }
    }
    return {
        data: null,
        error: {
            code: 500,
            message: 'Internal Server Error',
        },
    };
});
