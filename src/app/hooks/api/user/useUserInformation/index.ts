import axios, { AxiosError } from 'axios';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { captureAxiosError } from '../../../../utils/sentry';
import { BaseErrorResponse } from '../../types';
import { UserGetEntryResponse } from './types';

const fetchUserInformation = (jwt: string) => async (): Promise<UserGetEntryResponse> => {
    try {
        const response = await axios.get<UserGetEntryResponse>('/api/users/me', {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        return response.data;
    } catch (err) {
        captureAxiosError(err as AxiosError);
        throw (err as AxiosError).response?.data;
    }
};

/**
 * Return list of School entries
 */
export function useUserInformation(userToken: string): UseQueryResult<UserGetEntryResponse, BaseErrorResponse> {
    return useQuery({
        queryKey: ['user-me'],
        queryFn: fetchUserInformation(userToken),
    });
}
