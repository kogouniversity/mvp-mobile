import { AuthUserDataResponse } from '../types';

export type EmailVerificationParam = {
    code: string;
};

export type AuthEmailVerificationResponse = {
    message: string;
    user: AuthUserDataResponse['user'];
};
