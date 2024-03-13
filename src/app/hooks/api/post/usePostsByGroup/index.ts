import { QueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ListPostResponse } from './types';
import { BaseErrorResponse } from '../../types';
import { captureAxiosError } from '../../../../utils/sentry';

const fetchPostsByGroup = async (
    groupName: string,
    page: number = 1,
    pageSize: number = 25,
): Promise<ListPostResponse> => {
    const params: AxiosRequestConfig['params'] = {
        _sort: 'groupName:asc',
        _page: page,
        _limit: pageSize,
        'groupName': groupName,
        populate: 'group',
    };

    try {
        const response = await axios.get<ListPostResponse>('/api/posts?populate=group', {
            headers: { 'Content-Type': 'application/json' },
            params,
        });
        return response.data;
    } catch (err) {
        captureAxiosError(err as AxiosError<BaseErrorResponse>);
        throw (err as AxiosError).response?.data;
    }
};

export function usePostsByGroup(
    groupName: string,
    queryOptions?: QueryOptions<ListPostResponse, BaseErrorResponse>,
    page: number = 1,
    pageSize: number = 25,
): UseQueryResult<ListPostResponse, BaseErrorResponse> {
    return useQuery<ListPostResponse, BaseErrorResponse>({
        ...(queryOptions ?? {}),
        queryKey: ['postsByGroup', groupName, page, pageSize],
        queryFn: () => fetchPostsByGroup(groupName, page, pageSize),
    });
}
