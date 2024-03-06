import { QueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ListGroupResponse } from '../useGroup/types';
import { BaseErrorResponse } from '../../types';
import { captureAxiosError } from '../../../../utils/sentry';
import { useUserInformation } from '../../user/useUserInformation';

const fetchMyGroups = async (userId: string): Promise<ListGroupResponse> => {
    try {
        const response = await axios.get<ListGroupResponse>(`/api/users/${userId}/groups`);
        return response.data;
    } catch (err) {
        captureAxiosError(err as AxiosError<BaseErrorResponse>);
        throw (err as AxiosError).response?.data;
    }
};

export function useMyGroup(
    userToken: string,
    queryOptions?: QueryOptions<ListGroupResponse, BaseErrorResponse>,
): UseQueryResult<ListGroupResponse, BaseErrorResponse> {
    const userQueryResult = useUserInformation(userToken);
    const userId = userQueryResult.data?.user?.id;
    return useQuery<ListGroupResponse, BaseErrorResponse>({
        ...(queryOptions ?? {}),
        queryKey: ['myGroups', userToken],
        queryFn: () => (userId ? fetchMyGroups(userId) : Promise.reject(new Error('User information not available'))),
    });
}
