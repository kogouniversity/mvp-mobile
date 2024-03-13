import { QueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ListGroupResponse } from '../types';
import { BaseErrorResponse } from '../../types';
import { captureAxiosError } from '../../../../utils/sentry';

const fetchGroups = async (): Promise<ListGroupResponse> => {
    try {
        const response = await axios.get<ListGroupResponse>('/api/groups?populate=icon');
        return response.data;
    } catch (err) {
        captureAxiosError(err as AxiosError<BaseErrorResponse>);
        throw (err as AxiosError).response?.data;
    }
};

export function useGroup(
    queryOptions?: QueryOptions<ListGroupResponse, BaseErrorResponse>,
): UseQueryResult<ListGroupResponse, BaseErrorResponse> {
    return useQuery<ListGroupResponse, BaseErrorResponse>({
        ...(queryOptions ?? {}),
        queryKey: ['groups'],
        queryFn: fetchGroups,
    });
}
