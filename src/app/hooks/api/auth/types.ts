export type AuthUserDataResponse = {
    data: {
        user: object;
        jwt: string;
    };
};

export type AuthErrorResponse = {
    data: null;
    error: object;
};
