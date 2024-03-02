export type EmailTokenRequestParam = {
    verificationCode: string;
};

export type AuthEmailTokenRequestResponse = {
    emailToken: string;
};
