import { AuthUserDataResponse } from '../types';

/**
 * @param emailToken email verification code that is sent to a user email. Only valid within the configured TTL time.
 */
export type UserSignUpParams = {
    username: string;
    password: string;
    email: string;
};

export type AuthSignUpResponse = AuthUserDataResponse & {
    email_verification: {
        message: string;
        expiry: string;
    };
};
