import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("accessToken") || null,
  setAccessToken: (token) => set({ accessToken: token }),
  logout: () => {
    localStorage.removeItem("accessToken");
    set({ accessToken: null });
  },
}));
