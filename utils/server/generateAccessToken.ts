import jwt from 'jsonwebtoken';
import type { TokenData } from './types';

export default (tokenDataRaw: TokenData): string => {
    const secret = process.env.NUXT_AUTH_TOKEN_SALT;
    const tokenData: TokenData = {
        fullName: tokenDataRaw.fullName,
        organization: tokenDataRaw.organization,
        login: tokenDataRaw.login,
        role: tokenDataRaw.role,
    };
    if (!secret) {
        throw new Error(
            'NUXT_AUTH_TOKEN_SALT is not defined in environment variables'
        );
    }

    return jwt.sign(tokenData, secret, { expiresIn: '1h' });
};
