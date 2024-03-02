import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';

const deletePost = async (postId: number): Promise<void> => {
    await axios.delete(`/api/posts/${postId}`);
};

export function useDeletePost(): UseMutationResult<
    void,
    Error,
    number,
    unknown
> {
    return useMutation({
        mutationFn: deletePost,
    });
}
