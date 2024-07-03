export interface AuthUser {
    id: string;
    username: string;
    email: string;
}

export interface AuthUserDataResponse {
    jwt: string;
    user: AuthUser;
}
