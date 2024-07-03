import { create } from 'zustand';

interface AuthState {
  jwt: string | null;
  userName: string | null;
  groupIds: number[] | null;
  setJwt: (jwt: string) => void;
  setUserName: (userName: string) => void;
  setGroupIds: (groupIds: number[]) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  jwt: null,
  userName: null,
  groupIds: null,
  setJwt: (jwt) => set({ jwt }),
  setUserName: (userName) => set({ userName }),
  setGroupIds: (groupIds) => set({ groupIds }),
  clearAuth: () => set({ jwt: null, userName: null, groupIds: null }),
}));
