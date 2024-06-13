import { QueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ListPostResponse } from './types';
import { BaseErrorResponse } from '../../types';
import { captureAxiosError } from '../../../../utils/sentry';
import { useAuthToken } from '../../../../hooks/api/auth/useAuthToken';

const fetchPostsByGroupID = async (groupID: string, jwt: string | null): Promise<ListPostResponse> => {
    try {
        if (!jwt) {
            throw new Error('JWT token is missing');
        }

        const response = await axios.get<ListPostResponse>(
            `/api/posts?populate=group&filters[group]=${groupID}&sort[0]=createdAt:desc`,
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

export function usePostsByGroup(
    groupID: string,
    queryOptions?: QueryOptions<ListPostResponse, BaseErrorResponse>,
): UseQueryResult<ListPostResponse, BaseErrorResponse> {
    const jwt = useAuthToken();

    return useQuery<ListPostResponse, BaseErrorResponse>({
        ...(queryOptions ?? {}),
        queryKey: ['usePostsByGroup', groupID],
        queryFn: () => fetchPostsByGroupID(groupID, jwt),
    });
}
