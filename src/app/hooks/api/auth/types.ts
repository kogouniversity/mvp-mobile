export type AuthUserDataResponse = {
    user: object;
    jwt: string;
};

export type AuthErrorResponse = {
    data: null;
    error: object;
};
