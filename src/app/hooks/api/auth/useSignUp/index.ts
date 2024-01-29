import axios, { AxiosError } from 'axios';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { captureAxiosError } from '../../../../utils/sentry';
import { AuthErrorResponse, AuthUserDataResponse } from '../types';
import { UserSignUpParams } from './types';

const signUp = async ({
    username,
    email,
    password,
}: UserSignUpParams): Promise<AuthUserDataResponse> => {
    try {
        const response = await axios.post<AuthUserDataResponse>(
            '/api/auth/local/register',
            {
                username,
                email,
                password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
        return response.data;
    } catch (err) {
        captureAxiosError(err as AxiosError);
        throw (err as AxiosError).response?.data;
    }
};

export default function useSignUp(): UseMutationResult<
    AuthUserDataResponse,
    AuthErrorResponse,
    UserSignUpParams,
    unknown
> {
    return useMutation<
        AuthUserDataResponse,
        AuthErrorResponse,
        UserSignUpParams,
        unknown
    >({
        mutationFn: (params: UserSignUpParams) => signUp(params),
    });
}
