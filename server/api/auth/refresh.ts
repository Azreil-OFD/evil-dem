import generateAccessToken from '~/utils/server/generateAccessToken';
import generateRefreshToken from '~/utils/server/generateRefreshToken';
import { RefreshTokenData } from '~/utils/server/types';
import validateRefreshToken from '~/utils/server/validateRefreshToken';
import verifyRefreshToken from '~/utils/server/verifyRefreshToken';

export default defineEventHandler(async (event) => {
    const body: RefreshTokenData = await readBody(event);
    const validate = validateRefreshToken(body);
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
    try {
        const user = await verifyRefreshToken(body.refreshToken);

        return {
            data: {
                token: generateAccessToken(user),
                refresh: generateRefreshToken(user),
            },
            error: null,
        };
    } catch (error) {
        setResponseStatus(event, 401);
        return {
            data: null,
            error: {
                code: 401,
                message: 'Невалидный токен',
            },
        };
    }
});
