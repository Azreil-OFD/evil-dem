export type SignUpData = {
    fullName: string;
    organization: string;
    login: string;
    role: string;
    password: string;
};
export type SignInData = {
    login: string;  
    password: string;
};
export type TokenData = {
    fullName: string;
    organization: string;
    login: string;
    role: string;
};
export type ValidationResult = {
    validate: boolean;
    message: string | null;
};
export type RefreshTokenData = {
    refreshToken: string;
};
