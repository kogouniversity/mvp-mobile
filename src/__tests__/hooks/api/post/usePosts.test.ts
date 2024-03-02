import axios from 'axios';
import { waitFor } from '@testing-library/react-native';
import { createAxiosMockErrorRejected, renderHook } from '../../../test-utils';
import { usePosts } from '../../../../app/hooks/api/post/usePosts/index';
import { captureAxiosError } from '../../../../app/utils/sentry';
import { BaseErrorResponse } from '../../../../app/hooks/api/types';
import { ListPostResponse } from '../../../../app/hooks/api/post/usePosts/types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('../../../app/utils/sentry', () => ({
    captureAxiosError: jest.fn(),
}));

const postData: ListPostResponse = {
    data: [
        {
            id: 1,
            attributes: {
                content: 'body text',
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

describe('usePosts', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return the initial values', () => {
        const { result } = renderHook(() => usePosts());
        expect(result.current.data).toBe(undefined);
        expect(result.current.error).toBe(null);
        expect(result.current.isSuccess).toBe(false);
        expect(result.current.isError).toBe(false);
    });

    describe('when data is fetched successfully', () => {
        beforeEach(() => {
            mockedAxios.get.mockResolvedValue({ data: postData });
        });

        it('should retrieve post list data', async () => {
            const { result } = renderHook(() => usePosts());
            await waitFor(() =>
                expect(result.current).toMatchObject({
                    data: postData,
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
            const { result } = renderHook(() => usePosts({ retry: false }));
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
