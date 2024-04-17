import axios, { AxiosError } from 'axios';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { captureAxiosError } from '../../../../utils/sentry';
import { AuthEmailVerificationResponse, EmailVerificationParam } from './types';
import { BaseErrorResponse } from '../../types';

const postEmailVerification = async ({ code }: EmailVerificationParam): Promise<AuthEmailVerificationResponse> => {
    try {
        const response = await axios.post<AuthEmailVerificationResponse>(
            '/api/auth/local/email-verification',
            {
                code,
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

type UseEmailVerificationResult = UseMutationResult<
    AuthEmailVerificationResponse,
    BaseErrorResponse,
    EmailVerificationParam,
    unknown
>;

/**
 * Send a verification code and email.
 * If the verification code is valid, then it will return an authenticated user entry
 */
export default function useEmailVerification(): UseEmailVerificationResult & {
    requestEmailVerification: UseEmailVerificationResult['mutate'];
    requestEmailVerificationAsync: UseEmailVerificationResult['mutateAsync'];
} {
    const {
        mutate: requestEmailVerification,
        mutateAsync: requestEmailVerificationAsync,
        ...mutation
    } = useMutation<AuthEmailVerificationResponse, BaseErrorResponse, EmailVerificationParam, unknown>({
        mutationFn: (params: EmailVerificationParam) => postEmailVerification(params),
    });
    return {
        requestEmailVerification,
        requestEmailVerificationAsync,
        mutate: requestEmailVerification,
        mutateAsync: requestEmailVerificationAsync,
        ...mutation,
    };
}
