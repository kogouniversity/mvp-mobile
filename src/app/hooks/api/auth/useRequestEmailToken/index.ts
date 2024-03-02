import axios, { AxiosError } from 'axios';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { captureAxiosError } from '../../../../utils/sentry';
import { AuthEmailTokenRequestResponse, EmailTokenRequestParam } from './types';
import { BaseErrorResponse } from '../../types';

const fetchEmailToken = async ({
    verificationCode,
}: EmailTokenRequestParam): Promise<AuthEmailTokenRequestResponse> => {
    try {
        const response = await axios.post<AuthEmailTokenRequestResponse>(
            '/api/auth/local/email-verification',
            {
                verificationCode,
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

type UseRequestEmailTokenMutationResult = UseMutationResult<
    AuthEmailTokenRequestResponse,
    BaseErrorResponse,
    EmailTokenRequestParam,
    unknown
>;

export default function useRequestEmailToken(): UseRequestEmailTokenMutationResult & {
    requestEmailToken: UseRequestEmailTokenMutationResult['mutate'];
    requestEmailTokenAsync: UseRequestEmailTokenMutationResult['mutateAsync'];
} {
    const {
        mutate: requestEmailToken,
        mutateAsync: requestEmailTokenAsync,
        ...mutation
    } = useMutation<AuthEmailTokenRequestResponse, BaseErrorResponse, EmailTokenRequestParam, unknown>({
        mutationFn: (params: EmailTokenRequestParam) => fetchEmailToken(params),
    });
    return {
        requestEmailToken,
        requestEmailTokenAsync,
        mutate: requestEmailToken,
        mutateAsync: requestEmailTokenAsync,
        ...mutation,
    };
}
