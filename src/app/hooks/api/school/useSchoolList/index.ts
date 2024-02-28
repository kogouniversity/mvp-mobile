import { QueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { SchoolListEntryResponse } from './types';
import { captureAxiosError } from '../../../../utils/sentry';
import { BaseErrorResponse } from '../../types';

const fetchSchoolList = async (): Promise<SchoolListEntryResponse> => {
    try {
        const response = await axios.get<SchoolListEntryResponse>('/api/schools', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (err) {
        captureAxiosError(err as AxiosError);
        throw (err as AxiosError).response?.data;
    }
};

/**
 * Return list of School entries
 */
export function useSchoolList(
    queryOptions?: QueryOptions<SchoolListEntryResponse, BaseErrorResponse>,
): UseQueryResult<SchoolListEntryResponse, BaseErrorResponse> {
    return useQuery<SchoolListEntryResponse, BaseErrorResponse>({
        ...(queryOptions ?? {}),
        queryKey: ['schools'],
        queryFn: fetchSchoolList,
    });
}
