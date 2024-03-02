import axios from 'axios';
import { waitFor } from '@testing-library/react-native';
import { useDeletePost } from '../../../../app/hooks/api/post/useDeletePost';
import { renderHook } from '../../../test-utils';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useDeletePost', () => {
    const postId = 1;

    it('successfully deletes a post', async () => {
        mockedAxios.delete.mockResolvedValueOnce({});

        const { result } = renderHook(() => useDeletePost());

        result.current.mutate(postId);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(mockedAxios.delete).toHaveBeenCalledWith(`/api/posts/${postId}`);
    });

    it('error when deletion fails', async () => {
        const errorMessage = 'Deletion failed';
        mockedAxios.delete.mockRejectedValueOnce(new Error(errorMessage));

        const { result } = renderHook(() => useDeletePost());

        result.current.mutate(postId);

        await waitFor(() => expect(result.current.isError).toBe(true));

        expect(result.current.error).toEqual(expect.any(Error));
    });
});
