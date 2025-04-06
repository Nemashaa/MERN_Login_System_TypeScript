import { create } from "zustand";
import axios from 'axios';
import type { User } from '../interfaces/User';

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  loading: true,

  setUser: (user) => set({ user, isLoggedIn: !!user }),

  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

  checkAuth: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get<User>('/profile', { withCredentials: true });
      set({ user: data, isLoggedIn: true });
    } catch (error) {
      console.error('Authentication check failed:', error);
      set({ user: null, isLoggedIn: false });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await axios.post('/logout', {}, { withCredentials: true });
      set({ user: null, isLoggedIn: false });
    } catch (error) {
      console.error("Logout error:", error);
    }
  },
}));

export default useAuthStore;
