import { create } from 'zustand';

interface AuthState {
    jwt: string | null;
    username: string;
    setJwt: (jwt: string) => void;
    clearJwt: () => void;
    setUserName: (jwt: string) => void;
    clearUserName: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
    jwt: null,
    username: '',
    setJwt: (jwt: string) => set({ jwt }),
    clearJwt: () => set({ jwt: null }),
    setUserName: (username: string) => set({ username }),
    clearUserName: () => set({ username: '' }),
}));
