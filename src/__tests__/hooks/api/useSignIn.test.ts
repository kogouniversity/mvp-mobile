import { act, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import useSignIn from '../../../app/hooks/api/auth/useSignIn';
import {
    AuthErrorResponse,
    AuthUserDataResponse,
} from '../../../app/hooks/api/auth/types';
import { renderHook } from '../../test-utils';
import { captureAxiosError } from '../../../app/utils/sentry';

// Mock jest and set the type
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useFetchedData', () => {
    it('should return the initial values', () => {
        const { result } = renderHook(() => useSignIn());
        const { data, error, isSuccess, isError } = result.current;
        expect(data).toBe(undefined);
        expect(error).toBe(null);
        expect(isSuccess).toBe(false);
        expect(isError).toBe(false);
    });
    describe('when data is fetch successfully', () => {
        let mockData: AuthUserDataResponse;

        beforeEach(() => {
            mockData = {
                data: {
                    user: {},
                    jwt: 'userjwt',
                },
            };
            mockedAxios.post.mockResolvedValue({ data: mockData, status: 200 });
        });
        it('should return user data in json object', async () => {
            const { result } = renderHook(() => useSignIn());
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
        let mockErrorData: AuthErrorResponse;

        beforeEach(() => {
            mockErrorData = {
                data: null,
                error: {
                    message: 'failed',
                },
            };
            mockedAxios.post.mockRejectedValue({
                response: {
                    data: mockErrorData,
                    status: 400,
                },
            });
        });
        it('should return error response as json object', async () => {
            const { result } = renderHook(() => useSignIn());
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
            await waitFor(() =>
                expect(captureAxiosError).toHaveBeenCalledTimes(1),
            );
        });
    });
});
