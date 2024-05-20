import { QueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { captureAxiosError } from '../../../../utils/sentry';
import { BaseErrorResponse } from '../../types';
import { FriendsResponse } from './types';

const fetchFriends = async (userId: string): Promise<FriendsResponse> => {
    try {
        const response = await axios.get<FriendsResponse>(`/api/friends`, {
            params: {
                'filters[user]': userId,
            },
        });
        return response.data;
    } catch (err) {
        captureAxiosError(err as AxiosError<BaseErrorResponse>);
        throw (err as AxiosError).response?.data;
    }
};

export function useFriends(
    userId: string,
    queryOptions?: QueryOptions<FriendsResponse, BaseErrorResponse>,
): UseQueryResult<FriendsResponse, BaseErrorResponse> {
    return useQuery<FriendsResponse, BaseErrorResponse>({
        ...(queryOptions ?? {}),
        queryKey: ['friends', userId],
        queryFn: () => (userId ? fetchFriends(userId) : Promise.reject(new Error('User information not available'))),
    });
}
