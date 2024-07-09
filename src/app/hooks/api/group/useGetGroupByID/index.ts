import { QueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { GroupResponse } from './types';
import { BaseErrorResponse } from '../../types';
import { captureAxiosError } from '../../../../utils/sentry';
import { useAuthToken } from '../../auth/useAuthToken';

const fetchGroupByID = async (groupiD: string, jwt: string | null): Promise<GroupResponse> => {
    try {
        if (!jwt) {
            throw new Error('JWT token is missing');
        }
        const response = await axios.get<GroupResponse>(`/api/groups/${groupiD}?populate=tags`, {
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

export function useGetGroupByID(
    groupiD: string,
    queryOptions?: QueryOptions<GroupResponse, BaseErrorResponse>,
): UseQueryResult<GroupResponse, BaseErrorResponse> {
    const jwt = useAuthToken();
    return useQuery<GroupResponse, BaseErrorResponse>({
        ...(queryOptions ?? {}),
        queryKey: ['useGetGroupByID', groupiD],
        queryFn: () =>
            groupiD ? fetchGroupByID(groupiD, jwt) : Promise.reject(new Error('Group information not available')),
    });
}
