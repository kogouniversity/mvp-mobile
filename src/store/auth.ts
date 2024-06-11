import { create } from 'zustand';

interface AuthState {
    jwt: string | null;
    setJwt: (jwt: string) => void;
    clearJwt: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
    jwt: null,
    setJwt: (jwt: string) => set({ jwt }),
    clearJwt: () => set({ jwt: null }),
}));
