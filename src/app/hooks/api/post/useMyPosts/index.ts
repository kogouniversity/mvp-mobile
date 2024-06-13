import { QueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ListPostResponse } from './types';
import { BaseErrorResponse } from '../../types';
import { captureAxiosError } from '../../../../utils/sentry';
import { useAuthToken, useAuthUserName } from '../../auth/useAuthToken';

const fetchPostByUserName = async (username: string, jwt: string | null): Promise<ListPostResponse> => {
    try {
        if (!jwt) {
            throw new Error('JWT token is missing');
        }
        const response = await axios.get<ListPostResponse>(
            `/api/posts?filters[author][username][$eq]=${username}&populate=group&sort[0]=createdAt:desc`,
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

export function useGetPostByUserName(
    queryOptions?: QueryOptions<ListPostResponse, BaseErrorResponse>,
): UseQueryResult<ListPostResponse, BaseErrorResponse> {
    const jwt = useAuthToken();
    const username = useAuthUserName();
    return useQuery<ListPostResponse, BaseErrorResponse>({
        ...(queryOptions ?? {}),
        queryKey: ['useGetPostByUserName'],
        queryFn: () => fetchPostByUserName(username, jwt),
    });
}
