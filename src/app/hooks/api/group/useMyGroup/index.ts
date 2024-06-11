import { QueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ListGroupResponse } from '../types';
import { BaseErrorResponse } from '../../types';
import { captureAxiosError } from '../../../../utils/sentry';
import { useAuthToken } from '../../auth/useAuthToken';

const fetchMyGroups = async (jwt: string | null): Promise<ListGroupResponse> => {
    try {
        if (!jwt) {
            throw new Error('JWT token missing');
        }
        const response = await axios.get<ListGroupResponse>('/api/following?page=1&pageSize=10', {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        return response.data;
    } catch (err) {
        captureAxiosError(err as AxiosError<BaseErrorResponse>);
        throw (err as AxiosError).response?.data;
    }
};

export function useMyGroup(
    queryOptions?: QueryOptions<ListGroupResponse, BaseErrorResponse>,
): UseQueryResult<ListGroupResponse, BaseErrorResponse> {
    const jwt = useAuthToken();

    return useQuery<ListGroupResponse, BaseErrorResponse>({
        ...(queryOptions ?? {}),
        queryKey: ['myGroups'],
        queryFn: () => fetchMyGroups(jwt),
    });
}
