import { useAuthStore } from '../../../../../store/auth';

export const useAuthToken = () => {
    return useAuthStore(state => state.jwt);
};
