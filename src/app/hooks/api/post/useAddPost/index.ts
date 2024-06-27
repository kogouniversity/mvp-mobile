import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ListPostResponse } from './types';
import { captureAxiosError } from '../../../../utils/sentry';
import { useAuthToken } from '../../auth/useAuthToken';

interface AddPostData {
    title: string;
    content: string;
    groupId: string;
}

const addPostToGroup = async (postData: AddPostData, jwt: string): Promise<ListPostResponse> => {
    try {
        const response = await axios.post<ListPostResponse>(
            '/api/posts?populate=group',
            {
                data: {
                    title: postData.title,
                    content: postData.content,
                    group: {
                        id: Number(postData.groupId),
                    },
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json',
                },
            },
        );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        captureAxiosError(axiosError);
        if (axiosError.response?.status === 404) {
            throw new Error('Group not found');
        }
        throw error;
    }
};

export function useAddPost(): UseMutationResult<ListPostResponse, Error, AddPostData, unknown> {
    const jwt = useAuthToken();

    return useMutation({
        mutationFn: (postData: AddPostData) => addPostToGroup(postData, jwt ?? ''),
        onError: (error: Error) => {
            console.error('Error adding post:', error);
        },
    });
}
