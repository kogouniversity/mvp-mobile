import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ListCommentsResponse, Comment } from './types';
import { captureAxiosError } from '../../../../utils/sentry';
import { useAuthToken } from '../../auth/useAuthToken';

interface AddCommentData {
    content: string;
    postId: string;
    parentCommentId?: string;
}

const addComment = async (commentData: AddCommentData, jwt: string): Promise<Comment> => {
    try {
        const requestBody = {
            data: {
                content: commentData.content,
                post: commentData.postId,
                ...(commentData.parentCommentId && { parentComment: commentData.parentCommentId }),
            },
        };

        const response = await axios.post<Comment>('/api/comments', requestBody, {
            headers: {
                Authorization: `Bearer ${jwt}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        captureAxiosError(axiosError);
        if (axiosError.response?.status === 404) {
            throw new Error('Post or Comment not found');
        }
        throw error;
    }
};

export function useAddComment(): UseMutationResult<Comment, Error, AddCommentData, unknown> {
    const jwt = useAuthToken();

    return useMutation({
        mutationFn: (commentData: AddCommentData) => addComment(commentData, jwt ?? ''),
        onError: (error: Error) => {
            console.error('Error adding comment:', error);
        },
    });
}
