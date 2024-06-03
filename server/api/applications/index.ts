import verifyRefreshToken from '~/utils/server/token/verifyRefreshToken';
import verifyToken from '~/utils/server/token/verifyToken';

export default defineEventHandler(async (event) => {
    const headers = event.req.headers;
    let api_key: string | string[] | undefined = '';
    try {
        api_key = headers['authentication'];
    } catch (error) {
        return {
            data: null,
            error: {
                code: 401,
                message: 'Не зарегестрировано!',
            },
        };
    }
    console.log(await verifyToken(api_key));
    return 'Hello Nitro';
});
