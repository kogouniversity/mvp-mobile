import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { captureAxiosError } from '../../../../utils/sentry';
import { useAuthToken } from '../../auth/useAuthToken';

interface LikeCommentData {
    commentId: string;
}

const likeComment = async ({ commentId }: LikeCommentData, jwt: string): Promise<void> => {
    try {
        await axios.post(`/api/comment/${commentId}/like`, null, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
    } catch (error) {
        const axiosError = error as AxiosError;
        captureAxiosError(axiosError);
        throw error;
    }
};

export function useAddCommentLike(): UseMutationResult<void, Error, LikeCommentData, unknown> {
    const jwt = useAuthToken();

    return useMutation({
        mutationFn: (data: LikeCommentData) => likeComment(data, jwt ?? ''),
        onError: (error: Error) => {
            console.error('Error liking comment:', error);
        },
    });
}
