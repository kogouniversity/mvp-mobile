import { act, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import useSignIn from '../../../../app/hooks/api/auth/useSignIn';
import { AuthUserDataResponse } from '../../../../app/hooks/api/auth/types';
import { createAxiosMockErrorRejected, createAxiosMockResolved, renderHookWithQueryClient } from '../../../test-utils';
import { captureAxiosError } from '../../../../app/utils/sentry';
import { BaseErrorResponse } from '../../../../app/hooks/api/types';

// Mock jest and set the type
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const testUser = {
    id: '3',
    username: 'testuser',
    email: 'test@gmail.com',
    createdAt: 'Tue Aug 19 1975 23:15:30',
    updatedAt: 'Tue Aug 19 1975 23:15:30',
};

const errorResponse = {
    status: '',
    name: '',
    message: 'failed',
    details: {},
};

describe('useSignIn', () => {
    it('should return the initial values', () => {
        const { result } = renderHookWithQueryClient(() => useSignIn());
        const { data, error, isSuccess, isError } = result.current;
        expect(data).toBe(undefined);
        expect(error).toBe(null);
        expect(isSuccess).toBe(false);
        expect(isError).toBe(false);
    });
    describe('when data is fetch successfully', () => {
        const mockData: AuthUserDataResponse = {
            user: testUser,
            jwt: 'userjwt',
        };

        beforeEach(() => {
            mockedAxios.post.mockResolvedValue(createAxiosMockResolved(mockData));
        });
        it('should return user data in json object', async () => {
            const { result } = renderHookWithQueryClient(() => useSignIn());
            const { mutate } = result.current;
            act(() => {
                mutate({
                    identifier: 'abc',
                    password: 'def',
                });
            });
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
            mockedAxios.post.mockRejectedValue(createAxiosMockErrorRejected(mockErrorData));
        });
        it('should return error response as json object', async () => {
            const { result } = renderHookWithQueryClient(() => useSignIn());
            const { mutate } = result.current;
            act(() => {
                mutate({
                    identifier: 'abc',
                    password: 'def',
                });
            });
            await waitFor(() =>
                expect(result.current).toMatchObject({
                    data: undefined,
                    error: mockErrorData,
                    isSuccess: false,
                    isError: true,
                }),
            );
            await waitFor(() => expect(captureAxiosError).toHaveBeenCalledTimes(1));
        });
    });
});
