import { QueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ListPostResponse } from './types';
import { BaseErrorResponse } from '../../types';
import { captureAxiosError } from '../../../../utils/sentry';

const fetchPostsByMyGroups = async (userId: string): Promise<ListPostResponse> => {
    try {
        const response = await axios.get<ListPostResponse>(`/api/posts/groups?populate=icon&filters[users]=${userId}`);
        return response.data;
    } catch (err) {
        captureAxiosError(err as AxiosError<BaseErrorResponse>);
        throw (err as AxiosError).response?.data;
    }
};

export function usePostsByMyGroup(
    userId: string,
    queryOptions?: QueryOptions<ListPostResponse, BaseErrorResponse>,
): UseQueryResult<ListPostResponse, BaseErrorResponse> {
    return useQuery<ListPostResponse, BaseErrorResponse>({
        ...(queryOptions ?? {}),
        queryKey: ['myGroups', userId],
        queryFn: () =>
            userId ? fetchPostsByMyGroups(userId) : Promise.reject(new Error('User information not available')),
    });
}
