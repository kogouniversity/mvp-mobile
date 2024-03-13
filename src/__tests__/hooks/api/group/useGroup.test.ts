import axios from 'axios';
import { waitFor } from '@testing-library/react-native';
import { createAxiosMockErrorRejected, renderHookWithQueryClient } from '../../../test-utils';
import { useGroup } from '../../../../app/hooks/api/group/useGroup/index';
import { captureAxiosError } from '../../../../app/utils/sentry';
import { BaseErrorResponse } from '../../../../app/hooks/api/types';
import { ListGroupResponse } from '../../../../app/hooks/api/group/useGroup/types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const groupData: ListGroupResponse = {
    data: [
        {
            id: 1,
            attributes: {
                name: "Vancouver_KR",
                createdAt: "2024-03-12T07:58:15.556Z",
                updatedAt: "2024-03-12T08:08:15.515Z",
                publishedAt: "2024-03-12T08:08:15.513Z",
                description: "밴쿠버에 있는 모든 대학교 학생들을 위한 소통방입니다^^",
            }
        },
        {
            id: 2,
            attributes: {
                name: "Toronto_KR",
                createdAt: "2024-03-12T21:37:14.713Z",
                updatedAt: "2024-03-12T21:37:16.015Z",
                publishedAt: "2024-03-12T21:37:16.013Z",
                description: "토론토 방",
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
            }
        }
    ],
    meta: {
        pagination: {
            page: 1,
            pageSize: 25,
            pageCount: 1,
            total: 3,
        },
    },
};

const errorResponse = {
    status: '',
    name: '',
    message: 'failed',
    details: {},
};

describe('useGroup', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return the initial values', () => {
        const { result } = renderHookWithQueryClient(() => useGroup());
        expect(result.current.data).toBe(undefined);
        expect(result.current.error).toBe(null);
        expect(result.current.isSuccess).toBe(false);
        expect(result.current.isError).toBe(false);
    });

    describe('when data is fetched successfully', () => {
        beforeEach(() => {
            mockedAxios.get.mockResolvedValue({ data: groupData });
        });

        it('should retrieve group list data', async () => {
            const { result } = renderHookWithQueryClient(() => useGroup());
            await waitFor(() =>
                expect(result.current).toMatchObject({
                    data: groupData,
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
            const { result } = renderHookWithQueryClient(() => useGroup({ retry: false }));
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
