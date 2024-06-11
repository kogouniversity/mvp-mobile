import { QueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ListPostResponse } from './types';
import { BaseErrorResponse } from '../../types';
import { captureAxiosError } from '../../../../utils/sentry';
import { useAuthToken } from '../../../../hooks/api/auth/useAuthToken';

const fetchPostsByMyGroups = async (filter: string, jwt: string | null): Promise<ListPostResponse> => {
    try {
        if (!jwt) {
            throw new Error('JWT token is missing');
        }

        if (filter === 'All') {
            const response = await axios.get<ListPostResponse>('/api/posts/AllPosts', {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            return response.data;
        } else {
            const response = await axios.get<ListPostResponse>('/api/posts/schoolPosts', {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            return response.data;
        }
    } catch (err) {
        captureAxiosError(err as AxiosError<BaseErrorResponse>);
        throw (err as AxiosError).response?.data;
    }
};

export function usePostsByMyGroup(
    filter: string,
    queryOptions?: QueryOptions<ListPostResponse, BaseErrorResponse>,
): UseQueryResult<ListPostResponse, BaseErrorResponse> {
    const jwt = useAuthToken();

    return useQuery<ListPostResponse, BaseErrorResponse>({
        ...(queryOptions ?? {}),
        queryKey: ['filter', filter],
        queryFn: () => fetchPostsByMyGroups(filter, jwt),
    });
}
