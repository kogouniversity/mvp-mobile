import axios from 'axios';
import { act, waitFor } from '@testing-library/react-native';
import { usePostsByGroup } from '../../../app/hooks/api/post/usePostsByGroup';
import {
    createAxiosMockErrorRejected,
    createAxiosMockResolved,
    renderHook,
} from '../../test-utils';
import { captureAxiosError } from '../../../app/utils/sentry';
import { BaseErrorResponse } from '../../../app/hooks/api/types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const groupPostsData = {
    data: [
        {
            id: 1,
            attributes: {
                content: [],
                title: 'Post 1',
                createdAt: '2020-01-01T00:00:00Z',
                updatedAt: '2020-01-02T00:00:00Z',
                publishedAt: '2020-01-02T00:00:00Z',
                group: {
                    data: {
                        id: 1,
                        attributes: {
                            name: 'Group 1',
                            createdAt: '2020-01-01T00:00:00Z',
                            updatedAt: '2020-01-02T00:00:00Z',
                            publishedAt: '2020-01-02T00:00:00Z',
                        },
                    },
                },
            },
        },
    ],
    meta: {
        pagination: {
            page: 1,
            pageSize: 25,
            pageCount: 1,
            total: 1,
        },
    },
};

const errorResponse = {
    status: '',
    name: '',
    message: 'failed',
    details: {},
};

describe('usePostsByGroup', () => {
    it('should return the initial values', () => {
        const { result } = renderHook(() => usePostsByGroup('Group 1'));
        const { data, error, isSuccess, isError } = result.current;
        expect(data).toBe(undefined);
        expect(error).toBe(null);
        expect(isSuccess).toBe(false);
        expect(isError).toBe(false);
    });

    describe('when data is fetched successfully', () => {
        beforeEach(() => {
            mockedAxios.get.mockResolvedValue(
                createAxiosMockResolved(groupPostsData),
            );
        });

        it('should retrieve posts by group', async () => {
            const { result } = renderHook(() => usePostsByGroup('Group 1'));
            await waitFor(() =>
                expect(result.current).toMatchObject({
                    data: groupPostsData,
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
            mockedAxios.get.mockRejectedValue(
                createAxiosMockErrorRejected(mockErrorData),
            );
        });
        it('should return error response', async () => {
            const { result } = renderHook(() =>
                usePostsByGroup('Group None', { retry: false }),
            );
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
