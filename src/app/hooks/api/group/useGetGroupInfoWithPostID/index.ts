import { QueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { PostWithGroupResponse } from './types';
import { BaseErrorResponse } from '../../types';
import { captureAxiosError } from '../../../../utils/sentry';
import { useAuthToken } from '../../auth/useAuthToken';

const fetchPostWithGroupByID = async (postID: string, jwt: string | null): Promise<PostWithGroupResponse> => {
    try {
        if (!jwt) {
            throw new Error('JWT token is missing');
        }
        const response = await axios.get<PostWithGroupResponse>(`/api/posts/${postID}?populate=group`, {
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

export function useGetPostWithGroupByID(
    postID: string,
    queryOptions?: QueryOptions<PostWithGroupResponse, BaseErrorResponse>,
): UseQueryResult<PostWithGroupResponse, BaseErrorResponse> {
    const jwt = useAuthToken();
    return useQuery<PostWithGroupResponse, BaseErrorResponse>({
        ...(queryOptions ?? {}),
        queryKey: ['useGetPostWithGroupByID', postID],
        queryFn: () =>
            postID ? fetchPostWithGroupByID(postID, jwt) : Promise.reject(new Error('Post information not available')),
    });
}
