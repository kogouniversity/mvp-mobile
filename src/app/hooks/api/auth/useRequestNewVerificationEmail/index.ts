import axios, { AxiosError } from 'axios';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { captureAxiosError } from '../../../../utils/sentry';
import { ResendEmailVerificationParam, AuthResendEmailVerificationResponse } from './types';
import { BaseErrorResponse } from '../../types';

const postNewVerificationEmail = async (
    params: ResendEmailVerificationParam,
): Promise<AuthResendEmailVerificationResponse> => {
    try {
        const response = await axios.post<AuthResendEmailVerificationResponse>(
            '/api/auth/local/resend-email-verification',
            {},
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

type UseRequestNewVerificationEmailResult = UseMutationResult<
    AuthResendEmailVerificationResponse,
    BaseErrorResponse,
    ResendEmailVerificationParam,
    unknown
>;

/**
 * Request a new verification code to an email
 */
export default function useRequestNewVerificationEmail(): UseRequestNewVerificationEmailResult & {
    requestNewVerificationEmail: UseRequestNewVerificationEmailResult['mutate'];
    requestNewVerificationEmailAsync: UseRequestNewVerificationEmailResult['mutateAsync'];
} {
    const {
        mutate: requestNewVerificationEmail,
        mutateAsync: requestNewVerificationEmailAsync,
        ...mutation
    } = useMutation<AuthResendEmailVerificationResponse, BaseErrorResponse, ResendEmailVerificationParam, unknown>({
        mutationFn: (params: ResendEmailVerificationParam) => postNewVerificationEmail(params),
    });
    return {
        requestNewVerificationEmail,
        requestNewVerificationEmailAsync,
        mutate: requestNewVerificationEmail,
        mutateAsync: requestNewVerificationEmailAsync,
        ...mutation,
    };
}
