import { QueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { BaseErrorResponse } from '../../types';
import { ListPostResponse } from './types';
import { captureAxiosError } from '../../../../utils/sentry';

const fetchPosts = async (page: number = 1, pageSize: number = 25): Promise<ListPostResponse> => {
    const params: AxiosRequestConfig['params'] = {
        _sort: 'createdAt:desc',
        _page: page,
        _limit: pageSize,
    };

    try {
        const response = await axios.get<ListPostResponse>('/api/posts', {
            headers: { 'Content-Type': 'application/json' },
            params,
        });
        return response.data;
    } catch (err) {
        captureAxiosError(err as AxiosError<BaseErrorResponse>);
        throw (err as AxiosError).response?.data;
    }
};

export function usePosts(
    queryOptions?: QueryOptions<ListPostResponse, BaseErrorResponse>,
    page: number = 1,
    pageSize: number = 25,
): UseQueryResult<ListPostResponse, BaseErrorResponse> {
    return useQuery<ListPostResponse, BaseErrorResponse>({
        ...(queryOptions ?? {}),
        queryKey: ['posts', page, pageSize],
        queryFn: () => fetchPosts(page, pageSize),
    });
}
