import { waitFor } from '@testing-library/react-native';
import axios from 'axios';
import { createAxiosMockErrorRejected, createAxiosMockResolved, renderHook } from '../../../test-utils';
import { captureAxiosError } from '../../../../app/utils/sentry';
import { BaseErrorResponse } from '../../../../app/hooks/api/types';
import { useSchoolList } from '../../../../app/hooks/api/school/useSchoolList';
import { SchoolListEntryResponse } from '../../../../app/hooks/api/school/useSchoolList/types';

// Mock jest and set the type
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const schoolData = [
    {
        id: 3,
        attributes: {
            email_domain: 'sfu.ca',
        },
    },
    {
        id: 4,
        attributes: {
            email_domain: 'ubc.ca',
        },
    },
];

const errorResponse = {
    status: '',
    name: '',
    message: 'failed',
    details: {},
};

describe('useSchoolList', () => {
    it('should return the initial values', () => {
        const { result } = renderHook(() => useSchoolList());
        const { data, error, isSuccess, isError } = result.current;
        expect(data).toBe(undefined);
        expect(error).toBe(null);
        expect(isSuccess).toBe(false);
        expect(isError).toBe(false);
    });
    describe('when data is fetch successfully', () => {
        const mockData: SchoolListEntryResponse = {
            data: schoolData,
            error: {},
        };

        beforeEach(() => {
            mockedAxios.get.mockResolvedValue(createAxiosMockResolved(mockData));
        });
        it('should retrieve school list data', async () => {
            const { result } = renderHook(() => useSchoolList());
            await waitFor(() =>
                expect(result.current).toMatchObject({
                    data: mockData,
                    error: null,
                    isSuccess: true,
                    isError: false,
                }),
            );
        });
    });
    describe('When data is failed to be fetched', () => {
        const mockErrorData: BaseErrorResponse = {
            data: null,
            error: errorResponse,
        };

        beforeEach(() => {
            mockedAxios.get.mockRejectedValue(createAxiosMockErrorRejected(mockErrorData));
        });
        it('should return error response', async () => {
            const { result } = renderHook(() => useSchoolList({ retry: false }));
            await waitFor(() =>
                expect(result.current).toMatchObject({
                    data: undefined,
                    error: mockErrorData,
                    isSuccess: false,
                    isError: true,
                }),
            );
            await waitFor(() => expect(captureAxiosError).toHaveBeenCalled());
        });
    });
});
