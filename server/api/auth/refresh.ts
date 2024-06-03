import generateAccessToken from '~/utils/server/token/generateAccessToken';
import generateRefreshToken from '~/utils/server/token/generateRefreshToken';
import { RefreshTokenData } from '~/utils/server/types';
import validateRefreshToken from '~/utils/server/token/validateRefreshToken';
import verifyRefreshToken from '~/utils/server/token/verifyRefreshToken';

export default defineEventHandler(async (event) => {
    const body: RefreshTokenData = await readBody(event);
    const { validate, message } = validateRefreshToken(body);

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

    try {
        const user = await verifyRefreshToken(body.refreshToken);
        return {
            data: {
                token: generateAccessToken(user),
                refresh: generateRefreshToken(user),
            },
            error: null,
        };
    } catch {
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
