export type EmailVerificationCodeRequestParam = {
    email: string;
};

export type AuthEmailVerificationCodeRequestResponse = {
    verificationCode: string;
    expiry: string; // Date parsable string
};
