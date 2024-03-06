import { AuthUserDataResponse } from '../types';

export type EmailVerificationParam = {
    email: string;
    verificationCode: string;
};

export type AuthEmailVerificationResponse = AuthUserDataResponse;
