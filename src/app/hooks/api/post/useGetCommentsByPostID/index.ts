import { QueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ListCommentsResponse } from './types';
import { BaseErrorResponse } from '../../types';
import { captureAxiosError } from '../../../../utils/sentry';

const fetchCommentsByPostID = async (postID: string): Promise<ListCommentsResponse> => {
    try {
        const response = await axios.get<ListCommentsResponse>(
            `/api/posts/comments?populate=icon&filters[post]=${postID}`,
        );
        return response.data;
    } catch (err) {
        captureAxiosError(err as AxiosError<BaseErrorResponse>);
        throw (err as AxiosError).response?.data;
    }
};

export function useGetCommentsByPostID(
    postID: string,
    queryOptions?: QueryOptions<ListCommentsResponse, BaseErrorResponse>,
): UseQueryResult<ListCommentsResponse, BaseErrorResponse> {
    return useQuery<ListCommentsResponse, BaseErrorResponse>({
        ...(queryOptions ?? {}),
        queryKey: ['postComments', postID],
        queryFn: () =>
            postID ? fetchCommentsByPostID(postID) : Promise.reject(new Error('Post information not available')),
    });
}
