import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { BaseErrorResponse } from '../../types';
import { captureAxiosError } from '../../../../utils/sentry';
import { useAuthToken } from '../../auth/useAuthToken';

const followGroup = async (groupID: string, jwt: string | null): Promise<void> => {
    try {
        if (!jwt) {
            throw new Error('JWT token is missing');
        }
        await axios.post(
            `/api/groups/${groupID}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );
    } catch (err) {
        captureAxiosError(err as AxiosError<BaseErrorResponse>);
        throw (err as AxiosError).response?.data;
    }
};

export function useFollowGroup(
    groupID: string,
    mutationOptions?: UseMutationOptions<void, BaseErrorResponse, void>,
): UseMutationResult<void, BaseErrorResponse, void> {
    const jwt = useAuthToken();
    return useMutation<void, BaseErrorResponse, void>({
        ...(mutationOptions ?? {}),
        mutationFn: () => followGroup(groupID, jwt),
    });
}
