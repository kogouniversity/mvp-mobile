import axios, { AxiosError } from 'axios';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { captureAxiosError } from '../../../../utils/sentry';
import { AuthUserDataResponse } from '../types';
import { UserSignUpParams } from './types';
import { BaseErrorResponse } from '../../types';

const signUp = async ({ username, emailToken, password }: UserSignUpParams): Promise<AuthUserDataResponse> => {
    try {
        const response = await axios.post<AuthUserDataResponse>(
            '/api/auth/local/register',
            {
                username,
                emailToken,
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

type UseSignUpMutationResult = UseMutationResult<AuthUserDataResponse, BaseErrorResponse, UserSignUpParams, unknown>;

export default function useSignUp(): UseSignUpMutationResult & {
    requestSignUp: UseSignUpMutationResult['mutate'];
    requestSignUpAsync: UseSignUpMutationResult['mutateAsync'];
} {
    const {
        mutate: requestSignUp,
        mutateAsync: requestSignUpAsync,
        ...mutation
    } = useMutation<AuthUserDataResponse, BaseErrorResponse, UserSignUpParams, unknown>({
        mutationFn: (params: UserSignUpParams) => signUp(params),
    });

    return {
        requestSignUp,
        requestSignUpAsync,
        mutate: requestSignUp,
        mutateAsync: requestSignUpAsync,
        ...mutation,
    };
}
