import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ListPostResponse } from './types';
import { captureAxiosError } from '../../../../utils/sentry';
import { BaseErrorResponse } from '../../types';

interface AddPostData {
    title: string;
    content: any[];
    groupName: string;
}

const addPostToGroup = async (
    postData: AddPostData,
): Promise<ListPostResponse> => {
    try {
        const response = await axios.post<ListPostResponse>(
            '/api/posts?populate=group',
            {
                ...postData,
            },
        );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        captureAxiosError(error as AxiosError);
        if (axiosError.response?.status === 404) {
            throw new Error('Group not found');
        }
        throw error;
    }
};

export function useAddPost(): UseMutationResult<
    ListPostResponse,
    Error,
    AddPostData,
    unknown
> {
    return useMutation({
        mutationFn: addPostToGroup,
    });
}
