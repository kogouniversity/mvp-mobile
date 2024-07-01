import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { captureAxiosError } from '../../../../utils/sentry';
import { useAuthToken } from '../../auth/useAuthToken';

interface LikeData {
    postId: string;
}

const likePost = async ({ postId }: LikeData, jwt: string): Promise<void> => {
    try {
        await axios.post(`/api/posts/${postId}/like`, null, {
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

export function useAddPostLike(): UseMutationResult<void, Error, LikeData, unknown> {
    const jwt = useAuthToken();

    return useMutation({
        mutationFn: (data: LikeData) => likePost(data, jwt ?? ''),
        onError: (error: Error) => {
            console.error('Error liking post:', error);
        },
    });
}
