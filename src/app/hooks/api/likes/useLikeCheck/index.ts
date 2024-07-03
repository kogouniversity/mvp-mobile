import { QueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { captureAxiosError } from '../../../../utils/sentry';
import { useAuthToken } from '../../auth/useAuthToken';

const fetchPostLikeCheck = async (postID: string, jwt: string | null): Promise<number> => {
    try {
        if (!jwt) {
            throw new Error('JWT token is missing');
        }
        const response = await axios.get(`/api/posts/${postID}/likeCheck`, {
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

const fetchCommentLikeCheck = async (commentID: string, jwt: string | null): Promise<number> => {
    try {
        if (!jwt) {
            throw new Error('JWT token is missing');
        }
        const response = await axios.get(`/api/comment/${commentID}/likeCheck`, {
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

export function usePostLikeCheck(
    postID: string,
    queryOptions?: QueryOptions<number, Error>,
): UseQueryResult<number, Error> {
    const jwt = useAuthToken();
    return useQuery<number, Error>({
        ...(queryOptions ?? {}),
        queryKey: ['postLikeCheck', postID],
        queryFn: () =>
            postID ? fetchPostLikeCheck(postID, jwt) : Promise.reject(new Error('Post information not available')),
    });
}

export function useCommentLikeCheck(
    commentID: string,
    queryOptions?: QueryOptions<number, Error>,
): UseQueryResult<number, Error> {
    const jwt = useAuthToken();
    return useQuery<number, Error>({
        ...(queryOptions ?? {}),
        queryKey: ['commentLikeCheck', commentID],
        queryFn: () =>
            commentID
                ? fetchCommentLikeCheck(commentID, jwt)
                : Promise.reject(new Error('Comment information not available')),
    });
}
