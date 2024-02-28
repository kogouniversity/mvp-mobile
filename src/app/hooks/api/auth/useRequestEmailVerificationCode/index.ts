import axios, { AxiosError } from 'axios';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { captureAxiosError } from '../../../../utils/sentry';
import { AuthEmailVerificationCodeRequestResponse, EmailVerificationCodeRequestParam } from './types';
import { BaseErrorResponse } from '../../types';

const fetchEmailVerificationCode = async ({
    email,
}: EmailVerificationCodeRequestParam): Promise<AuthEmailVerificationCodeRequestResponse> => {
    try {
        const response = await axios.post<AuthEmailVerificationCodeRequestResponse>(
            '/api/auth/local/email-verification',
            {
                email,
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

type UseRequestEmailVerificationCodeMutationResult = UseMutationResult<
    AuthEmailVerificationCodeRequestResponse,
    BaseErrorResponse,
    EmailVerificationCodeRequestParam,
    unknown
>;

export default function useRequestEmailVerificationCode(): UseRequestEmailVerificationCodeMutationResult & {
    requestEmailVerificationCode: UseRequestEmailVerificationCodeMutationResult['mutate'];
    requestEmailVerificationCodeAsync: UseRequestEmailVerificationCodeMutationResult['mutateAsync'];
} {
    const {
        mutate: requestEmailVerificationCode,
        mutateAsync: requestEmailVerificationCodeAsync,
        ...mutation
    } = useMutation<
        AuthEmailVerificationCodeRequestResponse,
        BaseErrorResponse,
        EmailVerificationCodeRequestParam,
        unknown
    >({
        mutationFn: (params: EmailVerificationCodeRequestParam) => fetchEmailVerificationCode(params),
    });
    return {
        requestEmailVerificationCode,
        requestEmailVerificationCodeAsync,
        mutate: requestEmailVerificationCode,
        mutateAsync: requestEmailVerificationCodeAsync,
        ...mutation,
    };
}
