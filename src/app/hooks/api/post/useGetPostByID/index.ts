import { QueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ListPostResponse } from './types';
import { BaseErrorResponse } from '../../types';
import { captureAxiosError } from '../../../../utils/sentry';

const fetchPostByID = async (postID: string): Promise<ListPostResponse> => {
    try {
        const response = await axios.get<ListPostResponse>(`/api/posts/post?populate=icon&filters[post]=${postID}`);
        return response.data;
    } catch (err) {
        captureAxiosError(err as AxiosError<BaseErrorResponse>);
        throw (err as AxiosError).response?.data;
    }
};

export function useGetPostByID(
    postID: string,
    queryOptions?: QueryOptions<ListPostResponse, BaseErrorResponse>,
): UseQueryResult<ListPostResponse, BaseErrorResponse> {
    return useQuery<ListPostResponse, BaseErrorResponse>({
        ...(queryOptions ?? {}),
        queryKey: ['postID', postID],
        queryFn: () => (postID ? fetchPostByID(postID) : Promise.reject(new Error('Post information not available'))),
    });
}
