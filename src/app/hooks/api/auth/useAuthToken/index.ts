import { useAuthStore } from '../../../../../store/auth';

export const useAuthToken = () => {
    return useAuthStore(state => state.jwt);
};

export const useAuthUserName = () => {
    return useAuthStore(state => state.username);
};
