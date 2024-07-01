import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { captureAxiosError } from '../../../../utils/sentry';
import { useAuthToken } from '../../auth/useAuthToken';

interface UnlikeData {
    postId: string;
}

const unlikePost = async ({ postId }: UnlikeData, jwt: string): Promise<void> => {
    try {
        await axios.delete(`/api/posts/${postId}/like`, {
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

export function useDeletePostLike(): UseMutationResult<void, Error, UnlikeData, unknown> {
    const jwt = useAuthToken();

    return useMutation({
        mutationFn: (data: UnlikeData) => unlikePost(data, jwt ?? ''),
        onError: (error: Error) => {
            console.error('Error unliking post:', error);
        },
    });
}
