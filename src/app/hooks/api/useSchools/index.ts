import { UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ListSchoolResponse } from './types';
import { captureAxiosError } from '../../../utils/sentry';
import { BaseErrorResponse } from '../types';

const fetchSchools = async (): Promise<ListSchoolResponse> => {
    try {
        const response = await axios.get<ListSchoolResponse>('/api/schools', {
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
export function useSchools(): UseQueryResult<
    ListSchoolResponse,
    BaseErrorResponse
> {
    return useQuery({
        queryKey: ['schools'],
        queryFn: fetchSchools,
    });
}
