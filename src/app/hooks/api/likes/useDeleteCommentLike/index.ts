import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { captureAxiosError } from '../../../../utils/sentry';
import { useAuthToken } from '../../auth/useAuthToken';

interface UnlikeCommentData {
    commentId: string;
}

const unlikeComment = async ({ commentId }: UnlikeCommentData, jwt: string): Promise<void> => {
    try {
        await axios.delete(`/api/comment/${commentId}/like`, {
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

export function useDelteCommentLike(): UseMutationResult<void, Error, UnlikeCommentData, unknown> {
    const jwt = useAuthToken();

    return useMutation({
        mutationFn: (data: UnlikeCommentData) => unlikeComment(data, jwt ?? ''),
        onError: (error: Error) => {
            console.error('Error unliking comment:', error);
        },
    });
}
