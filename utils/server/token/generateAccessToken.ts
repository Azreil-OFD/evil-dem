import jwt from 'jsonwebtoken';
import type { TokenData } from '../types';

export default (tokenDataRaw: TokenData): string => {
    const secret = process.env.NUXT_AUTH_TOKEN_SALT;

    if (!secret) {
        throw new Error(
            'NUXT_AUTH_TOKEN_SALT is not defined in environment variables'
        );
    }

    const { fullName, organization, login, role } = tokenDataRaw;
    const tokenData: TokenData = { fullName, organization, login, role };

    return jwt.sign(tokenData, secret, { expiresIn: '1h' });
};
