import SignIn from '~/utils/server/SignIn';
import generateAccessToken from '~/utils/server/generateAccessToken';
import generateRefreshToken from '~/utils/server/generateRefreshToken';
import { SignInData } from '~/utils/server/types';
import validateSignIn from '~/utils/server/validateSignIn';

export default defineEventHandler(async (event) => {
    console.log(event.headers);
    const body: SignInData = await readBody(event);
    const validate = validateSignIn(body);
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
    const createUserResult = await SignIn(body);
    if (createUserResult.status) {
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
                message: 'Неверный логин или пароль!',
            },
        };
    }
});
