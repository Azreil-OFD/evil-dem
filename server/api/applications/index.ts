import verifyToken from '~/utils/server/token/verifyToken';
function parseCookieString(cookieString: string): { [key: string]: string } {
    const cookies: { [key: string]: string } = {};

    // Split the cookie string by '; ' to get individual cookies
    const cookieParts = cookieString.split('; ');

    for (const part of cookieParts) {
        // Split each part by '=' to get the name and value
        const [name, ...rest] = part.split('=');
        const value = rest.join('=');

        // Decode the name and value to handle URL-encoded characters
        const decodedName = decodeURIComponent(name);
        const decodedValue = decodeURIComponent(value);

        // Add the name-value pair to the cookies object
        cookies[decodedName] = decodedValue;
    }

    return cookies;
}

export default defineEventHandler(async (event) => {
    const headers = event.req.headers;
    let api_key: string | string[] | undefined = '';
    try {
        api_key = headers['cookie'];
    } catch (error) {
        return {
            data: null,
            error: {
                code: 401,
                message: 'Не зарегестрировано!',
            },
        };
    }
    const user = await verifyToken(parseCookieString(api_key).token);

    const result = await $fetch(
        'http://localhost:3001/zayavka/client/findall',
        {
            method: 'POST',
            body: {
                id: user.id,
            },
        }
    );
    result.user = user;
    return result;
});