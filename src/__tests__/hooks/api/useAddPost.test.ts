import axios from 'axios';
import { act, waitFor } from '@testing-library/react-native';
import { renderHook } from '../../test-utils';
import { useAddPost } from '../../../app/hooks/api/post/useAddPost/index';
import { ListPostResponse } from '../../../app/hooks/api/post/useAddPost/types';
import { captureAxiosError } from '../../../app/utils/sentry';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const postData = {
    title: 'Test Post',
    content: ['Content of the post'],
    groupName: 'Test Group',
};

const mockPostResponse: ListPostResponse = {
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
            pageSize: 10,
            pageCount: 1,
            total: 1,
        },
    },
};

const mockErrorResponse = new Error('Group not found');

describe('useAddPost', () => {
    describe('when adding a post is successful', () => {
        beforeEach(() => {
            mockedAxios.post.mockResolvedValue({ data: mockPostResponse });
        });

        it('should return post data on success', async () => {
            const { result } = renderHook(() => useAddPost());
            result.current.mutate(postData);

            await waitFor(() =>
                expect(result.current).toMatchObject({
                    data: mockPostResponse,
                    error: null,
                    isSuccess: true,
                    isError: false,
                }),
            );
        });
    });

    describe('when adding a post fails', () => {
        beforeEach(() => {
            mockedAxios.post.mockRejectedValue(mockErrorResponse);
        });

        it('should return an error response', async () => {
            const { result } = renderHook(() => useAddPost());
            result.current.mutate(postData);

            await waitFor(() =>
                expect(result.current).toMatchObject({
                    data: undefined,
                    error: mockErrorResponse,
                    isSuccess: false,
                    isError: true,
                }),
            );
            await waitFor(() => expect(captureAxiosError).toHaveBeenCalled());
        });
    });
});
