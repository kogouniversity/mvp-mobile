import axios, { AxiosError } from 'axios';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { captureAxiosError } from '../../../../utils/sentry';
import { UserSignInParams } from './types';
import { AuthErrorResponse, AuthUserDataResponse } from '../types';

const signIn = async ({
    identifier,
    password,
}: UserSignInParams): Promise<AuthUserDataResponse> => {
    try {
        const response = await axios.post<AuthUserDataResponse>(
            '/api/auth/local',
            {
                identifier,
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

export default function useSignIn(): UseMutationResult<
    AuthUserDataResponse,
    AuthErrorResponse,
    UserSignInParams,
    unknown
> {
    return useMutation<
        AuthUserDataResponse,
        AuthErrorResponse,
        UserSignInParams,
        unknown
    >({
        mutationFn: (params: UserSignInParams) => signIn(params),
    });
}
