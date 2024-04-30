import { QueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { BaseErrorResponse } from '../../types';
import { captureAxiosError } from '../../../../utils/sentry';
import { Courses } from './types';

const fetchScheduleBySemester = async (semester: string): Promise<Courses> => {
    try {
        const response = await axios.get<Courses>(`/api/schedule?semester=${semester}`);
        return response.data;
    } catch (err) {
        captureAxiosError(err as AxiosError<BaseErrorResponse>);
        throw (err as AxiosError).response?.data;
    }
};

export function useGetSchedule(
    semester: string
):UseQueryResult<Courses, BaseErrorResponse> {
    return useQuery<Courses, BaseErrorResponse>({
        queryKey: ['semester', semester],
        queryFn: () => fetchScheduleBySemester(semester)
    });
}