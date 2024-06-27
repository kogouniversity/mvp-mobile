import axios, { AxiosError } from 'axios';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { captureAxiosError } from '../../../../utils/sentry';
import { UserSignInParams } from './types';
import { AuthUserDataResponse } from '../types';
import { BaseErrorResponse } from '../../types';

const signIn = async ({ identifier, password }: UserSignInParams): Promise<AuthUserDataResponse> => {
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
        console.log(JSON.stringify(err));
        captureAxiosError(err as AxiosError);
        throw (err as AxiosError).response?.data;
    }
};

type UseSignInMutationResult = UseMutationResult<AuthUserDataResponse, BaseErrorResponse, UserSignInParams, unknown>;

export default function useSignIn(): UseSignInMutationResult & {
    requestSignIn: UseSignInMutationResult['mutate'];
    requestSignInAsync: UseSignInMutationResult['mutateAsync'];
} {
    const {
        mutate: requestSignIn,
        mutateAsync: requestSignInAsync,
        ...mutation
    } = useMutation<AuthUserDataResponse, BaseErrorResponse, UserSignInParams, unknown>({
        mutationFn: (params: UserSignInParams) => signIn(params),
    });
    return {
        requestSignIn,
        requestSignInAsync,
        mutate: requestSignIn,
        mutateAsync: requestSignInAsync,
        ...mutation,
    };
}
