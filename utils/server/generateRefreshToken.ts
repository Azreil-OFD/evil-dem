import jwt from 'jsonwebtoken';
import type { TokenData } from './types';

export default (tokenDataRaw: TokenData): string => {
    const refreshSecret = process.env.NUXT_AUTH_REFRESH_TOKEN_SALT;
    const tokenData: TokenData = {
        fullName: tokenDataRaw.fullName,
        organization: tokenDataRaw.organization,
        login: tokenDataRaw.login,
        role: tokenDataRaw.role,
    };
    if (!refreshSecret) {
        throw new Error(
            'NUXT_AUTH_REFRESH_TOKEN_SALT is not defined in environment variables'
        );
    }

    return jwt.sign(tokenData, refreshSecret, { expiresIn: '7d' });
};
