export type ResendEmailVerificationParam = {
    email: string;
};

export type AuthResendEmailVerificationResponse = {
    message: string;
    expiry: string;
};
