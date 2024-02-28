/**
 * @param emailToken email verification code that is sent to a user email. Only valid within the configured TTL time.
 */
export type UserSignUpParams = {
    username: string;
    email: string;
    password: string;
    emailToken: string;
};
