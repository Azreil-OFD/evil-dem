import jwt from 'jsonwebtoken';
import type { TokenData } from '../types';

export default (tokenDataRaw: TokenData): string => {
    const secret = process.env.NUXT_AUTH_TOKEN_SALT;

    if (!secret) {
        throw new Error(
            'NUXT_AUTH_TOKEN_SALT is not defined in environment variables'
        );
    }
    const { id , fullName, organization, login, role } = tokenDataRaw.data;
    const tokenData: TokenData = { id , fullName, organization, login, role };

    const result = jwt.sign(tokenData, secret, { expiresIn: '1h' })
    return result;
};
