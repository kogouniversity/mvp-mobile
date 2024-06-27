import { QueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ListCommentsResponse } from './types';
import { BaseErrorResponse } from '../../types';
import { captureAxiosError } from '../../../../utils/sentry';
import { useAuthToken } from '../../auth/useAuthToken';

const fetchCommentsByPostID = async (
    postID: string,
    jwt: string | null,
    sortOption: string,
): Promise<ListCommentsResponse> => {
    try {
        if (!jwt) {
            throw new Error('JWT token is missing');
        }
        const response = await axios.get<ListCommentsResponse>(
            `/api/comments?populate=post&populate=replyComment&populate=parentComment&filters[post][id][$eq]=${postID}&sort[0]=${sortOption}`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );
        return response.data;
    } catch (err) {
        captureAxiosError(err as AxiosError<BaseErrorResponse>);
        throw (err as AxiosError).response?.data;
    }
};

export function useGetCommentsByPostID(
    postID: string,
    sortOption: string,
    queryOptions?: QueryOptions<ListCommentsResponse, BaseErrorResponse>,
): UseQueryResult<ListCommentsResponse, BaseErrorResponse> {
    const jwt = useAuthToken();
    return useQuery<ListCommentsResponse, BaseErrorResponse>({
        ...(queryOptions ?? {}),
        queryKey: ['postComments', postID, sortOption],
        queryFn: () =>
            postID
                ? fetchCommentsByPostID(postID, jwt, sortOption)
                : Promise.reject(new Error('Post information not available')),
    });
}
