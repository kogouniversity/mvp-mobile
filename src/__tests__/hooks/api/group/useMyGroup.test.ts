import axios from 'axios';
import { waitFor } from '@testing-library/react-native';
import { createAxiosMockErrorRejected, renderHookWithQueryClient } from '../../../test-utils';
import { useMyGroup } from '../../../../app/hooks/api/group/useMyGroup/index';
import { captureAxiosError } from '../../../../app/utils/sentry';
import { BaseErrorResponse } from '../../../../app/hooks/api/types';
import { ListGroupResponse } from '../../../../app/hooks/api/group/types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const useGroupData: ListGroupResponse = {
    data: [
        {
            id: 1,
            attributes: {
                name: "밴쿠버 유학생 방",
                createdAt: "2024-03-12T07:58:15.556Z",
                updatedAt: "2024-03-13T02:52:34.112Z",
                publishedAt: "2024-03-12T08:08:15.513Z",
                description: "밴쿠버에 있는 모든 대학교 학생들을 위한 소통방입니다^^",
                users: {
                    data: [
                        {
                            id: 1,
                            attributes: {
                                username: "test1",
                                email: "test1@gmail.com",
                                provider: "local",
                                confirmed: true,
                                blocked: false,
                                createdAt: "2024-02-21T07:16:18.918Z",
                                updatedAt: "2024-03-12T08:18:42.187Z"
                            }
                        },
                        {
                            id: 2,
                            attributes: {
                                username: "test2",
                                email: "test2@gmail.com",
                                provider: "local",
                                confirmed: true,
                                blocked: false,
                                createdAt: "2024-02-21T07:16:43.022Z",
                                updatedAt: "2024-03-12T08:18:54.716Z"
                            }
                        }
                    ]
                }
            }
        },
        {
            id: 3,
            attributes: {
                name: "Canada_KR",
                createdAt: "2024-03-12T21:52:56.926Z",
                updatedAt: "2024-03-12T21:52:57.668Z",
                publishedAt: "2024-03-12T21:52:57.667Z",
                description: "캐나다 한인 방",
                users: {
                    data: [
                        {
                            id: 1,
                            attributes: {
                                username: "test1",
                                email: "test1@gmail.com",
                                provider: "local",
                                confirmed: true,
                                blocked: false,
                                createdAt: "2024-02-21T07:16:18.918Z",
                                updatedAt: "2024-03-12T08:18:42.187Z"
                            }
                        },
                        {
                            id: 2,
                            attributes: {
                                username: "test2",
                                email: "test2@gmail.com",
                                provider: "local",
                                confirmed: true,
                                blocked: false,
                                createdAt: "2024-02-21T07:16:43.022Z",
                                updatedAt: "2024-03-12T08:18:54.716Z"
                            }
                        },
                        {
                            id: 3,
                            attributes: {
                                username: "test3",
                                email: "test3@gmail.com",
                                provider: "local",
                                confirmed: true,
                                blocked: false,
                                createdAt: "2024-03-12T21:36:36.108Z",
                                updatedAt: "2024-03-12T21:36:36.108Z"
                            }
                        }
                    ]
                }
            }
        }
    ],
    meta: {
        pagination: {
            page: 1,
            pageSize: 25,
            pageCount: 1,
            total: 2
        }
    }
}

const errorResponse = {
    status: '',
    name: '',
    message: 'failed',
    details: {},
};

const userId = '2'; // existing user id
const dumbId = '0'; // non-existing user id

describe('useMyGroup', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return the initial values', () => {
        const { result } = renderHookWithQueryClient(() => useMyGroup(userId));
        expect(result.current.data).toBe(undefined);
        expect(result.current.error).toBe(null);
        expect(result.current.isSuccess).toBe(false);
        expect(result.current.isError).toBe(false);
    });

    describe('when data is fetched successfully', () => {
        beforeEach(() => {
            mockedAxios.get.mockResolvedValue({ data: useGroupData });
        });

        it('should retrieve group list data for the given user id', async () => {
            const { result } = renderHookWithQueryClient(() => useMyGroup(userId));
            await waitFor(() =>
                expect(result.current).toMatchObject({
                    data: useGroupData,
                    error: null,
                    isSuccess: true,
                    isError: false,
                }),
            );
        });
    });

    describe('when data is failed to be fetched', () => {
        const mockErrorData: BaseErrorResponse = {
            data: null,
            error: errorResponse,
        };

        beforeEach(() => {
            mockedAxios.get.mockRejectedValue(createAxiosMockErrorRejected(mockErrorData));
        });

        it('should handle error correctly', async () => {
            const { result } = renderHookWithQueryClient(() => useMyGroup(dumbId, { retry: false }));
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
